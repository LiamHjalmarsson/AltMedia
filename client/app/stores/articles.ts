import type { QueryParams } from "~/types";
import type { Article } from "~/types/collectionTypes/article";

export const useArticleStore = defineStore("articles", () => {
	const articles = ref<Article[]>([]);

	const articlesLoaded = ref(false);

	const currentArticle = ref<Article | null>(null);

	const loading = ref(false);

	const { find, findOne } = useStrapi();

	async function fetchArticles(params?: QueryParams) {
		if (articlesLoaded.value) {
			return articles.value;
		}

		loading.value = true;

		try {
			const res = await find<Article>("articles", params);

			articles.value = res.data || [];

			articlesLoaded.value = true;

			return articles.value;
		} catch (error) {
			articles.value = [];

			articlesLoaded.value = true;

			return [];
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
			const res = await findOne<Article>("articles", slug);

			currentArticle.value = res.data;

			return currentArticle.value;
		} catch (error) {
			currentArticle.value = null;

			return null;
		} finally {
			loading.value = false;
		}
	}

	return { articles, articlesLoaded, currentArticle, loading, fetchArticles, fetchArticleBySlug };
});
