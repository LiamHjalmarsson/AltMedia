<script setup lang="ts">
import type { PageContent } from "~/types";
const articleStore = useArticleStore();

const { articles } = storeToRefs(articleStore);

const { findOne } = useStrapi();

await useAsyncData("articles", () => articleStore.fetchArticles(), {
	server: true,
	lazy: true,
	default: () => [],
	transform: (data) => data,
});

const { data: page } = await useAsyncData("articlesPage", async () => {
	const res = await findOne<PageContent>("articles-page");

	return res.data;
});

useAppHead(page?.value?.seo || undefined);
</script>

<template>
	<section class="relative py-4xl lg:py-5xl flex justify-center">
		<div class="w-full max-w-[1300px] px-md md:px-lg lg:px-2xl">
			<Heading
				tag="h1"
				:title="page?.title"
				:align_content="page?.align_content || 'left'"
				:description="page?.description"
				class="my-xl" />

			<div class="grid md:grid-cols-3 gap-2xl lg:gap-2xl">
				<article v-for="article in articles" :key="article.id" class="group transition-transform duration-500">
					<NuxtLink :to="`/articles/${article.slug}`" :aria-label="`Läs artikel: ${article.title}`">
						<figure class="overflow-hidden block shadow-lg">
							<NuxtImg
								v-if="article.cover?.url"
								:src="article.cover.url"
								:alt="article.cover.alternativeText || article.title"
								format="webp,avif"
								quality="85"
								loading="lazy"
								class="w-full h-[250px] md:h-[300px] object-cover" />
						</figure>

						<header class="mt-lg">
							<h2
								class="text-heading-md font-bold leading-tight tracking-tight lg:group-hover:text-primary transition-colors duration-300">
								{{ article.title }}
							</h2>

							<div class="flex justify-between items-center mt-xs">
								<div
									class="text-sm text-black/80 flex items-center gap-xs"
									v-if="article.published_date">
									<span>{{ article.published_date }}</span>
									<span aria-hidden="true"> / </span>
									<span>{{ article.reading_time_min || "10" }} min läsning</span>
								</div>

								<ReadMoreButton class="group-hover:text-primary" />
							</div>
						</header>
					</NuxtLink>
				</article>
			</div>
		</div>
	</section>
</template>
