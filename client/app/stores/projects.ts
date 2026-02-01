import type { QueryParams } from "~/types";
import type { Project } from "~/types/collectionTypes/project";

export const useProjectStore = defineStore("projects", () => {
	const projects = ref<Project[]>([]);

	const currentProject = ref<Project | null>(null);

	const loaded = ref(false);

	const loading = ref(false);

	const { find, findOne } = useStrapi();

	async function fetchProjects(params?: QueryParams) {
		if (loaded.value) return projects.value;

		loading.value = true;

		try {
			const res = await find<Project>("projects", params);

			loaded.value = true;

			projects.value = res?.data || [];

			return projects.value;
		} catch (err) {
			projects.value = [];

			return [];
		} finally {
			loading.value = false;
		}
	}

	async function fetchProject(slug: string) {
		if (currentProject.value?.slug === slug) return currentProject.value;

		loading.value = true;

		try {
			const res = await findOne<Project>("projects", slug);

			currentProject.value = res.data;

			return currentProject.value;
		} catch (err) {
			currentProject.value = null;

			return null;
		} finally {
			loading.value = false;
		}
	}

	return { projects, currentProject, loading, fetchProjects, fetchProject };
});
