import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Page } from "~/types/content/collections";

export const usePageStore = defineStore("pages", () => {
	const pages = ref<Page[]>([]);

	const currentPage = ref<Page | null>(null);

	const loading = ref(false);

	const { find, findOne } = useStrapi();

	async function fetchPages() {
		loading.value = true;

		try {
			const res: Strapi5ResponseMany<Page> = await find("pages");

			pages.value = res.data;

			return pages.value;
		} catch (error) {
			console.error("Failed to fetch pages:", error);
		} finally {
			loading.value = false;
		}
	}

	async function fetchPageBySlug(slug: string) {
		loading.value = true;
		try {
			const result: Strapi5ResponseSingle<Page> = await findOne<Page>("pages", slug);

			currentPage.value = result.data;

			return currentPage.value;
		} catch (error) {
			console.error("Failed to fetch page:", error);
		} finally {
			loading.value = false;
		}
	}

	return { pages, currentPage, loading, fetchPages, fetchPageBySlug };
});
