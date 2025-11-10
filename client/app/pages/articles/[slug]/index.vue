<script setup lang="ts">
const route = useRoute();

const articleStore = useArticleStore();

const { currentArticle } = storeToRefs(articleStore);

await useAsyncData(
	() => `article-${route.params.slug}`,
	async () => {
		if (typeof route.params.slug === "string") {
			return await articleStore.fetchArticleBySlug(route.params.slug);
		}
		return null;
	},
	{ watch: [() => route.params.slug], server: true }
);
</script>

<template>
	<Hero v-if="currentArticle?.hero" :block="currentArticle.hero" />

	<Introduction v-if="currentArticle?.introduction" :block="currentArticle.introduction" />

	<BlockRenderer v-if="currentArticle?.blocks" :blocks="currentArticle.blocks" />
</template>
