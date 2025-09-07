import type { Strapi5ResponseMany } from "@nuxtjs/strapi";
import type { Project } from "~/types/content/collections";

export const useProjectStore = defineStore("projects", () => {
	const projects = ref<Project[]>([]);

	const { find } = useStrapi();

	async function fetchProjects(title?: string | null) {
		const params: {
			filters?: {
				title: { $eqi: string };
			};
		} = {};

		if (title) {
			params.filters = {
				title: { $eqi: title },
			};
		}

		const result: Strapi5ResponseMany<Project> = await find<Project>("projects", params);

		projects.value = result.data || [];

		return projects.value;
	}

	async function fetchProject(title: string) {}

	return { projects, fetchProjects };
});
