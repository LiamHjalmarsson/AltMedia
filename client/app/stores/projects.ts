import type { Strapi5ResponseMany } from "@nuxtjs/strapi";
import type { Project } from "~/types";

export const useProjectStore = defineStore("projects", () => {
	const projects = ref<Project[]>([]);

	const currentProject = ref<Project | null>(null);

	const loading = ref(false);

	const { find } = useStrapi();

	async function fetchProjects(params?: Record<string, any>) {
		loading.value = true;

		try {
			const res: Strapi5ResponseMany<Project> = await find<Project>("projects");

			projects.value = res?.data || [];

			return projects.value;
		} catch (err) {
			console.error("Failed to fetch projects:", err);

			return [];
		} finally {
			loading.value = false;
		}
	}

	async function fetchProject(slug: string) {
		if (currentProject.value?.slug === slug) return currentProject.value;

		loading.value = true;

		try {
			const res: Strapi5ResponseMany<Project> = await find<Project>("projects");

			currentProject.value = res.data?.[0] || null;

			return currentProject.value;
		} catch (err) {
			console.error("Failed to fetch project:", err);

			return null;
		} finally {
			loading.value = false;
		}
	}

	return { projects, currentProject, loading, fetchProjects, fetchProject };
});
