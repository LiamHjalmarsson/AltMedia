import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { BuildProjectPage } from "~/types/singelTypes/buildProjectPage";
import type { UiStepComponent } from "~/types/components/buildProject/step";
import type { UiQuestionComponent } from "~/types/components/buildProject/question";

type FormFieldValue = string | string[] | undefined;

type BuildProjectFormData = Record<string, FormFieldValue>;

type ValidationErrorMap = Record<string, string>;

type BuildProjectLabelMap = Record<string, string>;

type StoreError = {
	message: string;
	unknownError?: unknown;
};

const BUILD_PROJECT_FIELD_LABELS: BuildProjectLabelMap = {
	name: "Namn",
	email: "Email",
	phone: "Telefon",
	message: "Meddelande",
	"Har du en befintlig webbplats?": "Har du en befintlig webbplats?",
	"Har du en grafisk profil?": "Har du en grafisk profil?",
	"Url till webbplats": "Url till webbplats",
	"Ange din budget och tidsram?": "Ange din budget och tidsram?",
	"När behöver du lansera?": "När behöver du lansera?",
};

export const useBuildProjectStore = defineStore("build-project", () => {
	const buildProjectPageContent = ref<BuildProjectPage | null>(null);

	const buildProjectSteps = ref<UiStepComponent[]>([]);

	const buildProjectFormData = ref<BuildProjectFormData>({});

	const activeStepValidationErrors = ref<ValidationErrorMap>({});

	const activeStepIndex = ref<number>(1);

	const hasSubmittedBuildProjectRequest = ref(false);

	const isBuildProjectPageFetchInProgress = ref(false);

	const isBuildProjectRequestSubmissionInProgress = ref(false);

	const buildProjectPageFetchError = ref<StoreError | null>(null);

	const buildProjectRequestSubmissionError = ref<StoreError | null>(null);

	const { findOne, create } = useStrapi();

	const totalStepCount = computed<number>(() => buildProjectSteps.value.length);

	const activeStepDefinition = computed<UiStepComponent | null>(() => {
		return buildProjectSteps.value[activeStepIndex.value - 1] ?? null;
	});

	const isLastStepActive = computed<boolean>(() => {
		return activeStepIndex.value === totalStepCount.value;
	});

	const progressPercentage = computed<number>(() => {
		if (!totalStepCount.value) return 0;

		return (activeStepIndex.value / totalStepCount.value) * 100;
	});

	const questionByFormFieldKeyMap = computed<Record<string, UiQuestionComponent>>(() => {
		const map: Record<string, UiQuestionComponent> = {};

		for (const step of buildProjectSteps.value) {
			for (const question of step.questions ?? []) {
				const formFieldKey = getFormFieldKeyFromQuestion(question);

				map[formFieldKey] = question;
			}
		}

		return map;
	});

	const summaryByLabel = computed<Record<string, string>>(() => {
		const summary: Record<string, string> = {};

		for (const step of buildProjectSteps.value) {
			for (const question of step.questions ?? []) {
				const formFieldKey = getFormFieldKeyFromQuestion(question);

				const rawFieldValue = buildProjectFormData.value[formFieldKey];

				if (isFormFieldValueEmpty(rawFieldValue)) continue;

				const questionTitleLabel = BUILD_PROJECT_FIELD_LABELS[question.title];

				const formFieldLabel = BUILD_PROJECT_FIELD_LABELS[formFieldKey];

				const displayLabel = questionTitleLabel || formFieldLabel || question.title;

				let displayValue = Array.isArray(rawFieldValue) ? rawFieldValue.join(", ") : String(rawFieldValue);

				if (displayLabel === "Url till webbplats") {
					const hasExistingWebsiteAnswer = buildProjectFormData.value["Har du en befintlig webbplats?"];

					if (hasExistingWebsiteAnswer !== "Ja") continue;
				}

				if (displayLabel === "Ange din budget och tidsram?") {
					if (rawFieldValue === "Annat (specificera)") {
						const customBudgetValue = buildProjectFormData.value["budget_custom"];

						if (!isFormFieldValueEmpty(customBudgetValue)) {
							displayValue = Array.isArray(customBudgetValue)
								? customBudgetValue.join(", ")
								: String(customBudgetValue);
						}
					}
				}

				if (displayLabel === "När behöver du lansera?") {
					if (rawFieldValue === "Annat (specificera)") {
						const customTimelineValue = buildProjectFormData.value["timeline_custom"];

						if (!isFormFieldValueEmpty(customTimelineValue)) {
							displayValue = Array.isArray(customTimelineValue)
								? customTimelineValue.join(", ")
								: String(customTimelineValue);
						}
					}
				}

				summary[displayLabel] = displayValue;
			}
		}

		return summary;
	});

	async function fetchBuildProjectPageIfNeeded(): Promise<BuildProjectPage | null> {
		if (buildProjectPageContent.value) return buildProjectPageContent.value;

		isBuildProjectPageFetchInProgress.value = true;

		buildProjectPageFetchError.value = null;

		try {
			const { data }: Strapi5ResponseSingle<BuildProjectPage> = await findOne("build-project-page");

			buildProjectPageContent.value = data;

			buildProjectSteps.value = normalizeBuildProjectSteps(data?.steps ?? []);

			return buildProjectPageContent.value;
		} catch (unknownError: unknown) {
			buildProjectPageContent.value = null;

			buildProjectSteps.value = [];

			buildProjectPageFetchError.value = {
				message: "Failed to fetch build project page.",
				unknownError,
			};

			return null;
		} finally {
			isBuildProjectPageFetchInProgress.value = false;
		}
	}

	function goToNextStep(): void {
		if (activeStepIndex.value < totalStepCount.value) {
			activeStepIndex.value += 1;

			activeStepValidationErrors.value = {};
		}
	}

	function goToPreviousStep(): void {
		if (activeStepIndex.value > 1) {
			activeStepIndex.value -= 1;

			activeStepValidationErrors.value = {};
		}
	}

	function setFormFieldValue(formFieldKey: string, formFieldValue: FormFieldValue): void {
		buildProjectFormData.value[formFieldKey] = formFieldValue;
	}

	function toggleQuestionOptionValue(formFieldKey: string, optionValue: string): void {
		const matchingQuestion = questionByFormFieldKeyMap.value[formFieldKey];

		if (!matchingQuestion) {
			const currentFieldValue = buildProjectFormData.value[formFieldKey];

			buildProjectFormData.value[formFieldKey] = toggleStringArrayValue(currentFieldValue, optionValue);

			return;
		}

		if (matchingQuestion.type === "single") {
			buildProjectFormData.value[formFieldKey] = optionValue;

			return;
		}

		const currentFieldValue = buildProjectFormData.value[formFieldKey];

		buildProjectFormData.value[formFieldKey] = toggleStringArrayValue(currentFieldValue, optionValue);
	}

	function validateActiveStepFields(): boolean {
		const step = activeStepDefinition.value;

		if (!step?.questions?.length) {
			activeStepValidationErrors.value = {};

			return true;
		}

		const validationErrors: ValidationErrorMap = {};

		for (const question of step.questions) {
			const formFieldKey = getFormFieldKeyFromQuestion(question);

			const fieldValue = buildProjectFormData.value[formFieldKey];

			const isFieldRequired = Boolean(question.required || question.input?.required);

			if (isFieldRequired && isFormFieldValueEmpty(fieldValue)) {
				validationErrors[formFieldKey] = "Detta fält är obligatoriskt.";

				continue;
			}

			if (question.conditional && fieldValue === question.conditional.trigger_value) {
				const dependentFieldKey = question.conditional.label;

				if (typeof dependentFieldKey === "string" && dependentFieldKey.trim().length > 0) {
					const dependentFieldValue = buildProjectFormData.value[dependentFieldKey];

					if (isFormFieldValueEmpty(dependentFieldValue)) {
						validationErrors[dependentFieldKey] = "Detta fält är obligatoriskt.";
					}
				}
			}
		}

		activeStepValidationErrors.value = validationErrors;

		return Object.keys(validationErrors).length === 0;
	}

	async function submitBuildProjectRequest(): Promise<boolean> {
		if (isBuildProjectRequestSubmissionInProgress.value) return false;

		isBuildProjectRequestSubmissionInProgress.value = true;

		buildProjectRequestSubmissionError.value = null;

		const projectRequestPayload = {
			name: buildProjectFormData.value["name"],
			email: buildProjectFormData.value["email"],
			phone: buildProjectFormData.value["phone"],
			data: buildProjectFormData.value,
		};

		try {
			await create("project-requests", projectRequestPayload);

			hasSubmittedBuildProjectRequest.value = true;

			return true;
		} catch (unknownError: unknown) {
			buildProjectRequestSubmissionError.value = {
				message: "Failed to submit build project request.",
				unknownError,
			};

			return false;
		} finally {
			isBuildProjectRequestSubmissionInProgress.value = false;
		}
	}

	function resetBuildProjectForm(): void {
		buildProjectFormData.value = {};

		activeStepIndex.value = 1;

		activeStepValidationErrors.value = {};

		hasSubmittedBuildProjectRequest.value = false;

		buildProjectRequestSubmissionError.value = null;
	}

	function getFormFieldKeyFromQuestion(question: UiQuestionComponent): string {
		return question.input?.name ?? question.title;
	}

	function getRelationsStepFormFieldKey(step: UiStepComponent): string {
		const stepIdentifierPart = step.id ? String(step.id) : step.title;

		return `relations_step_${stepIdentifierPart}`;
	}

	function toggleStringArrayValue(currentValue: FormFieldValue, toggledOptionValue: string): string[] {
		const currentArray = Array.isArray(currentValue) ? [...currentValue] : [];

		const existingIndex = currentArray.indexOf(toggledOptionValue);

		if (existingIndex >= 0) {
			currentArray.splice(existingIndex, 1);
		} else {
			currentArray.push(toggledOptionValue);
		}

		return currentArray;
	}

	function isFormFieldValueEmpty(formFieldValue: FormFieldValue): boolean {
		if (formFieldValue === undefined) return true;

		if (Array.isArray(formFieldValue)) return formFieldValue.length === 0;

		return String(formFieldValue).trim().length === 0;
	}

	function normalizeBuildProjectSteps(rawSteps: UiStepComponent[]): UiStepComponent[] {
		return rawSteps.map((step) => {
			if (step.type === "relations") {
				return {
					...step,
					questions: [],
					related_services: step.services ?? [],
					related_subservices: step.subservices ?? [],
					relation_titles: [
						...(step.services?.map((service) => service.title) ?? []),
						...(step.subservices?.map((subservice) => subservice.title) ?? []),
					],
				};
			}

			return {
				...step,
				questions: (step.questions ?? []).map((question) => ({
					...question,
					options: question.options ?? [],
				})),
			};
		});
	}

	return {
		buildProjectPageContent,
		buildProjectSteps,
		buildProjectFormData,
		activeStepValidationErrors,
		activeStepIndex,
		hasSubmittedBuildProjectRequest,
		isBuildProjectPageFetchInProgress,
		isBuildProjectRequestSubmissionInProgress,
		buildProjectPageFetchError,
		buildProjectRequestSubmissionError,

		totalStepCount,
		activeStepDefinition,
		isLastStepActive,
		progressPercentage,
		summaryByLabel,

		fetchBuildProjectPageIfNeeded,
		goToNextStep,
		goToPreviousStep,
		setFormFieldValue,
		toggleQuestionOptionValue,
		validateActiveStepFields,
		submitBuildProjectRequest,
		resetBuildProjectForm,

		getFormFieldKeyFromQuestion,
		getRelationsStepFormFieldKey,
	};
});
