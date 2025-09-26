<script setup lang="ts">
const route = useRoute();

const pageStore = usePageStore();

const { currentPage } = storeToRefs(pageStore);

console.log(currentPage);

watch(
	() => route.params.slug,
	async (slug) => {
		if (typeof slug === "string") {
			await pageStore.fetchPageBySlug(slug);
		} else {
			pageStore.currentPage = null;
		}
	},
	{ immediate: true }
);
</script>

<template>
	<BlocksRenderer v-if="currentPage?.blocks" :blocks="currentPage.blocks" />
</template>
