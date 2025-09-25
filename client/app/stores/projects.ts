import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Project } from "~/types/content/collections";

export const useProjectStore = defineStore("projects", () => {
	const projects = ref<Project[]>([]);

	const currentProject = ref<Project | null>(null);

	const loading = ref(false);

	const { find, findOne } = useStrapi();

	async function fetchProjects(service?: string | null) {
		loading.value = true;

		try {
			const params: any = {};

			if (service) {
				params.filters = {
					services: {
						slug: { $eqi: service },
					},
				};
			}

			const result: Strapi5ResponseMany<Project> = await find<Project>("projects", params);

			projects.value = result.data ?? [];

			return projects.value;
		} catch (error) {
			console.error("Failed to fetch projects:", error);
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
		} catch (error) {
			console.error("Failed to fetch project:", error);
		} finally {
			loading.value = false;
		}
	}

	return { projects, currentProject, loading, fetchProjects, fetchProject };
});
