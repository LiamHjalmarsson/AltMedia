import { defineStore } from "pinia";
import { ref } from "vue";
import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { BuildProject, Subservice } from "~/types/content/collections";

export const useBuildProjectStore = defineStore("buildProject", () => {
	const buildProject = ref<BuildProject | null>(null);

	const selectedSubIds = ref<Set<number>>(new Set());

	const loading = ref(false);

	const { findOne } = useStrapi();

	async function fetchBuildProject() {
		loading.value = true;

		try {
			const result: Strapi5ResponseSingle<BuildProject> = await findOne<BuildProject>("start-a-project");

			buildProject.value = result.data;

			return buildProject.value;
		} catch (error) {
			console.error("Failed to fetch start-project:", error);

			buildProject.value = null;

			return null;
		} finally {
			loading.value = false;
		}
	}

	return {
		buildProject,
		selectedSubIds,
		loading,

		fetchBuildProject,
	};
});
