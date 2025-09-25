<script setup lang="ts">
const route = useRoute();

const articleStore = useArticleStore();

const { currentArticle } = storeToRefs(articleStore);

watch(
	() => route.params.slug,
	async (slug) => {
		if (typeof slug === "string") {
			await articleStore.fetchArticleBySlug(slug);
		}
	},
	{ immediate: true }
);
</script>

<template>
	<Hero v-if="currentArticle?.hero" :block="currentArticle.hero" />

	<Introduction v-if="currentArticle?.introduction" :block="currentArticle.introduction" />

	<BlocksRenderer v-if="currentArticle?.blocks" :blocks="currentArticle.blocks" />
</template>
