import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Project } from "~/types";

export const useProjectStore = defineStore("projects", () => {
	const projects = ref<Project[]>([]);

	const currentProject = ref<Project | null>(null);

	const loading = ref(false);

	const { find, findOne } = useStrapi();

	async function fetchProjects(params?: Record<string, any>) {
		loading.value = true;

		try {
			const result: Strapi5ResponseMany<Project> = await find<Project>("projects", params);

			projects.value = result?.data || [];

			return projects.value;
		} catch (err) {
			projects.value = [];

			return [];
		} finally {
			loading.value = false;
		}
	}

	async function fetchProject(slug: string) {
		loading.value = true;

		try {
			const result: Strapi5ResponseSingle<Project> = await findOne<Project>("projects", slug);

			currentProject.value = result.data;

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
