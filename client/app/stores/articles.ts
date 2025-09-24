import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Article } from "~/types/content/collections";

export const useArticleStore = defineStore("articles", () => {
	const articles = ref<Article[]>([]);

	const currentArticle = ref<Article | null>(null);

	const loading = ref(false);

	const { find, findOne } = useStrapi();

	async function fetchArticles() {
		loading.value = true;

		try {
			const res: Strapi5ResponseMany<Article> = await find("articles");

			articles.value = res.data;

			return articles.value;
		} catch (error) {
			console.error("Failed to fetch articles:", error);
		} finally {
			loading.value = false;
		}
	}

	async function fetchArticleBySlug(slug: string) {
		loading.value = true;

		try {
			const res: Strapi5ResponseSingle<Article> = await findOne("articles", {
				filters: {
					slug: {
						$eq: slug,
					},
				},
			});

			currentArticle.value = res.data;

			return currentArticle.value;
		} catch (error) {
			console.error("Failed to fetch article:", error);
		} finally {
			loading.value = false;
		}
	}

	return { articles, currentArticle, loading, fetchArticles, fetchArticleBySlug };
});
