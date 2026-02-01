import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { BuildProjectPage } from "~/types/singelTypes/buildProjectPage";
import type { UiStepComponent } from "~/types/components/buildProject/step";
import type { UiQuestionComponent } from "~/types/components/buildProject/question";

type FormValue = string | string[] | undefined;

type FormDataRecord = Record<string, FormValue>;

export const useBuildProjectStore = defineStore("build-project", () => {
	const page = ref<BuildProjectPage | null>(null);

	const steps = ref<UiStepComponent[]>([]);

	const formData = ref<FormDataRecord>({});

	const stepValidationErrors = ref<Record<string, string>>({});

	const currentStepIndex = ref(1);

	const isSubmitted = ref(false);

	const loading = ref(false);

	const { findOne, create } = useStrapi();

	function fieldKey(question: UiQuestionComponent): string {
		return question.input?.name || question.title;
	}

	function toggleArrayValue(arr: string[] | undefined, val: string) {
		const list = Array.isArray(arr) ? [...arr] : [];

		const index = list.indexOf(val);

		if (index >= 0) list.splice(index, 1);
		else list.push(val);

		return list;
	}

	const labels: Record<string, string> = {
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

	const totalSteps = computed(() => steps.value.length);

	const activeStep = computed(() => steps.value[currentStepIndex.value - 1] || null);

	const isLastStep = computed(() => currentStepIndex.value === totalSteps.value);

	const progressPercent = computed(() => (totalSteps.value ? (currentStepIndex.value / totalSteps.value) * 100 : 0));

	const summaryFlat = computed(() => {
		const summary: Record<string, string> = {};

		steps.value.forEach((step) => {
			step.questions?.forEach((question) => {
				const formKey = question.input?.name || question.title;

				const key = labels[question.title] || labels[formKey] || question.title;

				const val = formData.value[formKey];

				if (!val) return;

				let result = Array.isArray(val) ? val.join(", ") : String(val);

				if (key === "Url till webbplats" && formData.value["Har du en befintlig webbplats?"] !== "Ja") {
					return;
				}

				if (key === "Ange din budget och tidsram?") {
					if (val === "Annat (specificera)" && formData.value["budget_custom"]) {
						const custom = formData.value["budget_custom"];

						result = Array.isArray(custom) ? custom.join(", ") : String(custom);
					}
				}

				if (key === "När behöver du lansera?") {
					if (val === "Annat (specificera)" && formData.value["timeline_custom"]) {
						const custom = formData.value["timeline_custom"];

						result = Array.isArray(custom) ? custom.join(", ") : String(custom);
					}
				}

				summary[key] = result;
			});
		});

		return summary;
	});

	async function fetchBuildProjectPage() {
		if (page.value) return page.value;

		loading.value = true;

		try {
			const { data }: Strapi5ResponseSingle<BuildProjectPage> = await findOne("build-project-page");

			page.value = data;

			steps.value = transformSteps(page.value?.steps || []);

			return data;
		} finally {
			loading.value = false;
		}
	}

	function nextStep() {
		if (currentStepIndex.value < totalSteps.value) {
			currentStepIndex.value++;

			stepValidationErrors.value = {};
		}
	}

	function previousStep() {
		if (currentStepIndex.value > 1) {
			currentStepIndex.value--;

			stepValidationErrors.value = {};
		}
	}

	async function submitProjectRequest() {
		const payload = {
			name: formData.value["name"],
			email: formData.value["email"],
			phone: formData.value["phone"],
			data: formData.value,
		};

		try {
			await create("project-requests", payload);

			isSubmitted.value = true;

			return true;
		} catch (error) {
			return false;
		}
	}

	function setValue(field: string, value: FormValue) {
		formData.value[field] = value;
	}

	function toggleOption(field: string, option: string) {
		const stepWithQuestion = steps.value.find((step) => step.questions?.some((q) => q.title === field));

		const matchedQuestion = stepWithQuestion?.questions?.find((q) => q.title === field);

		if (!matchedQuestion) {
			formData.value[field] = toggleArrayValue(formData.value[field] as string[], option);
			return;
		}

		if (matchedQuestion.type === "single") {
			formData.value[field] = option;
			return;
		}

		formData.value[field] = toggleArrayValue(formData.value[field] as string[], option);
	}

	function validateCurrentStep(): boolean {
		const step = activeStep.value;

		if (!step?.questions) return true;

		const errors: Record<string, string> = {};

		step.questions.forEach((question) => {
			const key = fieldKey(question);

			const value = formData.value[key];

			const isRequired = question.required || question.input?.required;

			const isEmpty = !value || value.toString().trim() === "";

			if (isRequired && isEmpty) {
				errors[key] = "Detta fält är obligatoriskt.";

				return;
			}

			if (question.conditional && value === question.conditional.trigger_value) {
				const dependentField = question.conditional.label;

				if (typeof dependentField === "string") {
					const dependentValue = formData.value[dependentField];

					if (!dependentValue || dependentValue.toString().trim() === "") {
						errors[dependentField] = "Detta fält är obligatoriskt.";
					}
				}
			}
		});

		stepValidationErrors.value = errors;

		return Object.keys(errors).length === 0;
	}

	function transformSteps(steps: UiStepComponent[]): UiStepComponent[] {
		return steps.map((step) => {
			if (step.type === "relations") {
				return {
					...step,
					questions: [],
					related_services: step.services ?? [],
					related_subservices: step.subservices ?? [],
					relation_titles: [
						...(step.services?.map((service) => service.title) || []),
						...(step.subservices?.map((subservice) => subservice.title) || []),
					],
				};
			}

			return {
				...step,
				questions: (step.questions || []).map((question) => ({
					...question,
					options: question.options ?? [],
				})),
			};
		});
	}

	function resetForm() {
		formData.value = {};

		currentStepIndex.value = 1;

		stepValidationErrors.value = {};

		isSubmitted.value = false;
	}

	return {
		page,
		steps,
		currentStepIndex,
		stepValidationErrors,
		formData,
		loading,
		isSubmitted,

		totalSteps,
		activeStep,
		progressPercent,
		isLastStep,
		summaryFlat,

		fetchBuildProjectPage,
		nextStep,
		previousStep,
		toggleOption,
		setValue,
		submitProjectRequest,
		resetForm,
		validateCurrentStep,
		fieldKey,
	};
});
