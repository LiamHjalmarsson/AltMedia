import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Article } from "~/types";

export const useArticleStore = defineStore("articles", () => {
	const articles = ref<Article[]>([]);

	const currentArticle = ref<Article | null>(null);

	const loading = ref(false);

	const { find, findOne } = useStrapi();

	async function fetchArticles(params?: Record<string, any>) {
		if (articles.value.length) {
			return articles.value;
		}

		loading.value = true;

		try {
			const res: Strapi5ResponseMany<Article> = await find<Article>("articles", params);

			articles.value = res.data || [];

			return articles.value;
		} catch (error) {
			console.error("Failed to fetch articles:", error);

			articles.value = [];
		} finally {
			loading.value = false;
		}
	}

	async function fetchArticleBySlug(slug: string) {
		if (currentArticle.value?.slug === slug) {
			return currentArticle.value;
		}

		loading.value = true;

		try {
			const result: Strapi5ResponseSingle<Article> = await findOne<Article>("articles", slug);

			currentArticle.value = result.data;

			return currentArticle.value;
		} catch (error) {
			console.error("Failed to fetch article:", error);
		} finally {
			loading.value = false;
		}
	}

	return { articles, currentArticle, loading, fetchArticles, fetchArticleBySlug };
});
