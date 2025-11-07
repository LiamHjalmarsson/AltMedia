<script setup lang="ts">
import type { PageContent } from "~/types/content/collections";

const articleStore = useArticleStore();

const { articles } = storeToRefs(articleStore);

const { findOne } = useStrapi();

await useAsyncData("articles", () => articleStore.fetchArticles(), { server: true });

const { data: page } = await useAsyncData("articlesPage", async () => {
	const res = await findOne<PageContent>("articles-page");

	return res.data;
});

useSeoMeta({
	title: page.value?.seo?.meta_title,
	description: page.value?.seo?.meta_description,
	ogTitle: page.value?.seo?.meta_title,
	ogDescription: page.value?.seo?.meta_description,
	ogUrl: page.value?.seo?.meta_canonical_url,
	twitterImage: page.value?.seo?.meta_image,
	ogImage: page.value?.seo?.meta_image,
	twitterCard: "summary_large_image",
});
</script>

<template>
	<section class="relative py-4xl lg:py-5xl flex justify-center">
		<div class="w-full max-w-[1300px] px-md md:px-lg lg:px-2xl">
			<Heading
				:title="page?.title"
				:align_content="page?.align_content"
				:description="page?.description"
				class="my-xl" />

			<div class="grid md:grid-cols-3 gap-2xl lg:gap-xl">
				<article v-for="article in articles" :key="article.id" class="group transition-transform duration-500">
					<NuxtLink :to="`/articles/${article.slug}`">
						<div class="overflow-hidden block shadow-lg">
							<NuxtImg
								v-if="article.cover?.url"
								:src="article.cover.url"
								:alt="article.cover.alternativeText || article.title"
								format="webp"
								quality="85"
								class="w-full h-[250px] md:h-[300px] object-cover"
								loading="lazy" />
						</div>

						<div class="mt-lg">
							<h3
								class="text-heading-md font-bold leading-tight tracking-tight lg:group-hover:text-primary transition-colors duration-300">
								{{ article.title }}
							</h3>

							<div class="flex justify-between items-center mt-sm">
								<div
									class="text-sm text-dark-gray flex items-center gap-xs"
									v-if="article.published_date">
									<span>{{ article.published_date }}</span>
									<span> / </span>
									<span>{{ article.reading_time_min || "10" }} min läsning</span>
								</div>

								<span class="inline-flex items-center text-primary text-sm font-semibold group">
									<span>Läs artikel</span>
									<Icon name="lucide:arrow-right" size="16" class="ml-xs" />
								</span>
							</div>
						</div>
					</NuxtLink>
				</article>
			</div>
		</div>
	</section>
</template>
