import { defineStore } from "pinia";
import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { BuildProjectPage, Step } from "~/types";

type FormDataRecord = Record<string, string | string[] | undefined>;

export const useBuildProjectStore = defineStore("build-project", () => {
	const page = ref<BuildProjectPage | null>(null);

	const steps = ref<Step[]>([]);

	const formData = ref<FormDataRecord>({});

	const stepValidationErrors = ref<Record<string, string>>({});

	const currentStepIndex = ref(0);

	const isSubmitted = ref(false);

	const loading = ref(false);

	const { findOne, create } = useStrapi();

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

		for (const step of steps.value) {
			for (const question of step.questions || []) {
				const formKey = question.input?.name || question.title;

				const key = labels[question.title] || labels[formKey] || question.title;

				const val = formData.value[formKey];

				if (!val) continue;

				let result = Array.isArray(val) ? val.join(", ") : String(val);

				if (key === "Url till webbplats" && formData.value["Har du en befintlig webbplats?"] !== "Ja") {
					continue;
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
			}

			if (step.type === "relations") {
				const key = step.title;
				const val = formData.value[key];

				if (val && Array.isArray(val) && val.length > 0) {
					summary[key] = val.join(", ");
				}
			}
		}

		return summary;
	});

	async function fetchBuildProjectPage() {
		if (page.value) {
			return page.value;
		}

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
		}
	}

	function previousStep() {
		if (currentStepIndex.value > 1) {
			currentStepIndex.value--;
		}
	}

	async function submitProjectRequest() {
		try {
			const payload = {
				name: formData.value["name"],
				email: formData.value["email"],
				phone: formData.value["phone"],
				data: formData.value,
			};

			await create("project-requests", payload);

			isSubmitted.value = true;

			return true;
		} catch (error) {
			return false;
		}
	}

	function setValue(label: string, value: string | string[]) {
		formData.value[label] = value;
	}

	function toggleOption(questionTitle: string, selectedOption: string) {
		const stepWithQuestion = steps.value.find((step) =>
			step.questions?.some((question) => question.title === questionTitle)
		);

		const matchedQuestion = stepWithQuestion?.questions?.find((question) => question.title === questionTitle);

		if (!matchedQuestion) {
			const existingValues = Array.isArray(formData.value[questionTitle])
				? [...(formData.value[questionTitle] as string[])]
				: [];

			const optionIndex = existingValues.indexOf(selectedOption);

			if (optionIndex !== -1) {
				existingValues.splice(optionIndex, 1);
			} else {
				existingValues.push(selectedOption);
			}

			formData.value = { ...formData.value, [questionTitle]: existingValues };

			return;
		}

		if (matchedQuestion.type === "single") {
			formData.value = { ...formData.value, [questionTitle]: selectedOption };

			return;
		}

		const existingValues = Array.isArray(formData.value[questionTitle])
			? [...(formData.value[questionTitle] as string[])]
			: [];

		const optionIndex = existingValues.indexOf(selectedOption);

		if (optionIndex !== -1) {
			existingValues.splice(optionIndex, 1);
		} else {
			existingValues.push(selectedOption);
		}

		formData.value = { ...formData.value, [questionTitle]: existingValues };
	}

	function validateCurrentStep(): boolean {
		const step = activeStep.value;

		if (!step) {
			return true;
		}

		const validationErrors: Record<string, string> = {};

		for (const question of step.questions || []) {
			const fieldName = question.input?.name || question.title;

			const fieldValue = formData.value[fieldName];

			const isRequired = question.required === true || question.input?.required === true;

			const isEmpty = !fieldValue || fieldValue.toString().trim() === "";

			if (isRequired && isEmpty) {
				validationErrors[fieldName] = "Detta fält är obligatoriskt.";

				continue;
			}

			if (question.conditional && fieldValue === question.conditional.trigger_value) {
				const dependentField = question.conditional.label;

				if (typeof dependentField === "string") {
					const dependentValue = formData.value[dependentField];

					if (!dependentValue || dependentValue.toString().trim() === "") {
						validationErrors[dependentField] = "Detta fält är obligatoriskt.";
					}
				}
			}
		}

		stepValidationErrors.value = validationErrors;

		return Object.keys(validationErrors).length === 0;
	}

	function transformSteps(steps: Step[]): Step[] {
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
	};
});
