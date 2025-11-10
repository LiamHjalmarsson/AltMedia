<script setup lang="ts">
const route = useRoute();

const articleStore = useArticleStore();

const { currentArticle } = storeToRefs(articleStore);

const slug = computed(() => route.params.slug as string);

await useAsyncData(
	() => `article:${slug.value}`,
	() => articleStore.fetchArticleBySlug(slug.value),
	{ server: true, lazy: true, watch: [slug] }
);
</script>

<template>
	<Hero v-if="currentArticle?.hero" :block="currentArticle.hero" />

	<Introduction v-if="currentArticle?.introduction" :block="currentArticle.introduction" />

	<BlockRenderer v-if="currentArticle?.blocks" :blocks="currentArticle.blocks" />
</template>
