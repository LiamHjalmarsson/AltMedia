import { defineStore } from "pinia";
import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { BuildProjectPage, Question, Service, Step, Subservice } from "~/types";

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
			const res: Strapi5ResponseSingle<BuildProjectPage> = await findOne<BuildProjectPage>("build-project-page");

			page.value = res.data;

			steps.value = page.value?.steps ? normalizeSteps(page.value.steps as any) : [];

			return page.value;
		} catch (err) {
			console.error("❌ Failed to fetch Build Project Page:", err);
			page.value = null;

			return null;
		} finally {
			loading.value = false;
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

	function toggleOption(label: string, option: string) {
		formData.value[label] = formData.value[label] || [];

		const current = formData.value[label] as string[];

		if (current.includes(option)) {
			formData.value[label] = current.filter((opt) => opt !== option);
		} else {
			formData.value[label] = [...current, option];
		}
	}

	async function submitProjectRequest() {
		try {
			const payload = {
				name: formData.value["Namn"],
				email: formData.value["E-post"],
				phone: formData.value["Telefonnummer"],
				data: summaryData.value,
			};

			await create("project-requests", payload);

			resetForm();

			return true;
		} catch (error) {
			return false;
		}
	}

	const totalStepCount = computed(() => steps.value.length);

	const progress = computed(() => (activeStepIndex.value / totalStepCount.value) * 100);

	const isOnLastStep = computed(() => activeStepIndex.value === totalStepCount.value);

	const summaryData = computed(() => {
		const excludedFields = ["Namn", "E-post", "Telefonnummer"];

		return Object.fromEntries(Object.entries(formData.value).filter(([key]) => !excludedFields.includes(key)));
	});

	function normalizeSteps(rawSteps: Step[]): Step[] {
		return rawSteps.map((step): Step => {
			const relatedServices: Pick<Service, "title">[] = step.related_services ?? [];

			const relatedSubservices: Pick<Subservice, "title">[] = step.related_subservices ?? [];

			const questions: Question[] = (step.questions || []).map((question): Question => {
				const options: string[] = Array.isArray(question.options)
					? question.options
					: question.options
						? [String(question.options)]
						: [];

				const expandedOptions =
					question.type === "multi" || question.type === "static"
						? [
								...relatedServices.map((sservice) => sservice.title),
								...relatedSubservices.map((subservice) => subservice.title),
							]
						: options;

				return {
					...question,
					options: expandedOptions.filter(Boolean),
				};
			});

			return {
				...step,
				questions,
			};
		});
	}

	function resetForm() {
		formData.value = {};

		activeStepIndex.value = 1;
	}

	return {
		page,
		steps,
		formData,
		activeStepIndex,
		totalStepCount,
		progress,
		isOnLastStep,
		summaryData,
		loading,
		fetchBuildProjectPage,
		nextStep,
		previousStep,
		toggleOption,
		submitProjectRequest,
		resetForm,
	};
});
