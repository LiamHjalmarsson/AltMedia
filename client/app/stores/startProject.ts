import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Offer, StartProject, Step } from "~/types/content/collections";

export const useStartProjectStore = defineStore("startProject", () => {
	const startProject = ref<StartProject | null>(null);

	const loading = ref(false);

	const { findOne } = useStrapi();

	async function fetchStartProject() {
		loading.value = true;

		try {
			const result: Strapi5ResponseSingle<StartProject> = await findOne<StartProject>("start-a-project");

			startProject.value = result.data;

			return startProject.value;
		} catch (error) {
			console.error("Failed to fetch start-project:", error);

			startProject.value = null;

			return null;
		} finally {
			loading.value = false;
		}
	}

	const offers = computed<Offer[]>(() => {
		return startProject.value?.offers || [];
	});

	return {
		startProject,
		offers,
		loading,
		fetchStartProject,
	};
});
