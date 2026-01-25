<script setup lang="ts">
const route = useRoute();

const articleStore = useArticleStore();

const { currentArticle } = storeToRefs(articleStore);

const slug = computed(() => route.params.slug as string);

await useAsyncData(
	() => `article:${slug.value}`,
	() => articleStore.fetchArticleBySlug(slug.value),
	{ server: true, lazy: true, watch: [slug] },
);

// watchEffect(() => {
// 	useAppHead(currentArticle.value?.seo || undefined);
// });
</script>

<template>
	<section
		class="hero overflow-hidden relative flex justify-center items-center px-xl py-4xl lg:px-lg xl:px-xl lg:py-5xl min-h-[100vh] max-lg:h-screen">
		<div class="pt-xl relative z-10">
			<div class="flex lg:space-x-3xl items-center relative z-10 max-w-[1600px]">
				<div class="w-1/2">
					<h1 class="text-heading-4xl md:text-heading-5xl xl:text-heading-6xl font-extrabold mb-xl">
						{{ currentArticle?.title }}
					</h1>
					<span>
						{{ currentArticle?.published_date }}
					</span>
				</div>

				<div class="flex-1">
					<NuxtImg
						:src="currentArticle?.cover.url"
						:alt="currentArticle?.cover.alternativeText || currentArticle?.title"
						format="webp,avif"
						quality="85"
						loading="lazy" />
				</div>
			</div>
		</div>
	</section>

	<BlockRenderer v-if="currentArticle?.blocks" :blocks="currentArticle.blocks" />
</template>
