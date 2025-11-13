import { defineStore } from "pinia";
import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { BuildProjectPage, Step, Question, Service, Subservice } from "~/types";

type FormDataRecord = Record<string, string | string[] | undefined>;

export const useBuildProjectStore = defineStore("build-project", () => {
	const page = ref<BuildProjectPage | null>(null);

	const steps = ref<Step[]>([]);

	const formData = ref<FormDataRecord>({});

	const activeStepIndex = ref(1);

	const loading = ref(false);

	const { findOne, create } = useStrapi();

	async function fetchBuildProjectPage() {
		if (page.value) {
			return page.value;
		}

		loading.value = true;

		try {
			const res: Strapi5ResponseSingle<BuildProjectPage> = await findOne("build-project-page");

			page.value = res.data;

			steps.value = normalizeSteps(page.value?.steps || []);

			return page.value;
		} catch (err) {
			console.error("❌ Failed to fetch Build Project Page:", err);

			page.value = null;

			return null;
		} finally {
			loading.value = false;
		}
	}

	function normalizeSteps(rawSteps: Step[]): Step[] {
		return rawSteps.map((step) => {
			const relatedServices = step.services ?? [];

			const relatedSubservices = step.subservices ?? [];

			if (step.type === "relations") {
				const relationTitles = [
					...relatedServices.map((service) => service.title),
					...relatedSubservices.map((subservice) => subservice.title),
				].filter(Boolean);

				return {
					...step,
					questions: [],
					related_services: relatedServices,
					related_subservices: relatedSubservices,
					relation_titles: relationTitles,
				};
			}

			const normalizedQuestions: Question[] = (step.questions || []).map((question) => ({
				...question,
				options: question.options ?? [],
			}));

			return { ...step, questions: normalizedQuestions };
		});
	}

	function toggleOption(label: string, option: string) {
		const step = steps.value.find((step) => step.questions?.some((question) => question.title === label));

		const question = step?.questions?.find((question) => question.title === label);

		if (!question) {
			const current = Array.isArray(formData.value[label]) ? [...(formData.value[label] as string[])] : [];

			const index = current.indexOf(option);

			if (index !== -1) {
				current.splice(index, 1);
			} else {
				current.push(option);
			}

			formData.value = { ...formData.value, [label]: current };
			return;
		}

		if (question.type === "single") {
			formData.value = { ...formData.value, [label]: option };

			return;
		}

		const current = Array.isArray(formData.value[label]) ? [...(formData.value[label] as string[])] : [];

		const index = current.indexOf(option);

		if (index !== -1) {
			current.splice(index, 1);
		} else {
			current.push(option);
		}

		formData.value = { ...formData.value, [label]: current };
	}

	function setValue(label: string, value: string | string[]) {
		formData.value[label] = value;
	}

	function resetForm() {
		formData.value = {};

		activeStepIndex.value = 1;
	}

	async function submitProjectRequest() {
		try {
			const payload = {
				name: formData.value["Namn"],
				email: formData.value["E-post"],
				phone: formData.value["Telefon"],
				data: summaryData.value,
			};

			await create("project-requests", payload);

			resetForm();

			return true;
		} catch (error) {
			console.error("❌ Failed to submit project request:", error);

			return false;
		}
	}

	function nextStep() {
		if (activeStepIndex.value < totalStepCount.value) {
			activeStepIndex.value++;
		}
	}

	function previousStep() {
		if (activeStepIndex.value > 1) {
			activeStepIndex.value--;
		}
	}

	const totalStepCount = computed(() => steps.value.length);

	const currentStep = computed(() => steps.value[activeStepIndex.value - 1] || null);

	const progress = computed(() => (totalStepCount.value ? (activeStepIndex.value / totalStepCount.value) * 100 : 0));

	const isOnLastStep = computed(() => activeStepIndex.value === totalStepCount.value);

	const summaryData = computed(() => {
		const excluded = ["Namn", "E-post", "Telefonnummer"];

		return Object.fromEntries(Object.entries(formData.value).filter(([key]) => !excluded.includes(key)));
	});

	const showSummaryPanel = computed(() => !!page.value?.settings?.show_summary_panel);

	function isRelationStep(step?: Step | null): boolean {
		return step?.type === "relations";
	}

	function isClickableRelations(step?: Step | null): boolean {
		return step?.clickable_relations === true;
	}

	return {
		page,
		steps,
		formData,
		activeStepIndex,
		loading,

		totalStepCount,
		currentStep,
		progress,
		isOnLastStep,
		summaryData,
		showSummaryPanel,

		fetchBuildProjectPage,
		nextStep,
		previousStep,
		toggleOption,
		setValue,
		submitProjectRequest,
		resetForm,

		isRelationStep,
		isClickableRelations,
	};
});
