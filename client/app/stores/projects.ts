import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Project } from "~/types/content/collections";

export const useProjectStore = defineStore("projects", () => {
	const projects = ref<Project[]>([]);

	const currentProject = ref<Project | null>(null);

	const loading = ref(false);

	const { find, findOne } = useStrapi();

	async function fetchProjects() {
		loading.value = true;

		try {
			const res: Strapi5ResponseMany<Project> = await find("projects");

			projects.value = res.data;

			return projects.value;
		} catch (error) {
			console.error("Failed to fetch projects:", error);
		} finally {
			loading.value = false;
		}
	}

	async function fetchProjectBySlug(slug: string) {
		loading.value = true;

		try {
			const res: Strapi5ResponseSingle<Project> = await findOne("projects", {
				filters: {
					slug: {
						$eq: slug,
					},
				},
			});

			currentProject.value = res.data;

			return currentProject.value;
		} catch (error) {
			console.error("Failed to fetch project:", error);
		} finally {
			loading.value = false;
		}
	}

	return { projects, currentProject, loading, fetchProjects, fetchProjectBySlug };
});
