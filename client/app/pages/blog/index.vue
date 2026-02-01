<script setup lang="ts">
import type { PageContent } from "~/types";
const articleStore = useArticleStore();

const { articles } = storeToRefs(articleStore);

const { findOne } = useStrapi();

await useAsyncData("articles", () => articleStore.fetchArticles(), {
	server: true,
	lazy: true,
});

const { data: page } = await useAsyncData("articlesPage", async () => {
	const { data } = await findOne<PageContent>("articles-page");

	return data;
});

useAppHead(page?.value?.seo || undefined);
</script>

<template>
	<section class="relative py-4xl lg:py-5xl flex justify-center">
		<div class="w-full max-w-[1400px] px-md md:px-lg lg:px-2xl">
			<Heading
				v-if="page?.title"
				tag="h1"
				:title="page?.title"
				:align_content="page?.align_content || 'left'"
				:description="page?.description"
				class="mt-2xl lg:mt-4xl mb-xl" />

			<div class="grid md:grid-cols-2 gap-lg lg:gap-2xl xl:gap-4xl" :class="[page?.title ? '' : 'pt-2xl']">
				<article v-for="article in articles" :key="article.id" class="group transition-transform duration-500">
					<NuxtLink :to="`/blogg/${article.slug}`" :aria-label="`Läs artikel: ${article.title}`">
						<figure class="overflow-hidden block shadow-lg">
							<NuxtImg
								v-if="article.cover?.url"
								:src="article.cover.url"
								:alt="article.cover.alternativeText || article.title"
								format="webp,avif"
								quality="85"
								loading="lazy"
								class="w-full h-40 lg:h-[250px] object-cover group-hover:scale-105 transition duration-300" />
						</figure>

						<header class="mt-lg">
							<h2
								md:text-heading-md
								lg:text-heading-lg
								tracking-tighter
								class="font-bold text-heading-sm md:text-heading-md lg:text-heading-lg xl:text-heading-xl tracking-tighter lg:group-hover:text-primary transition-colors duration-300 line-clamp-2">
								{{ article.title }}
							</h2>

							<p class="mt-sm lg:mt-md text-sm md:text-md lg:text-lg text-black/80 line-clamp-3">
								{{ article.description }}
							</p>

							<div
								v-if="article.published_date"
								class="flex justify-between items-center text-xs mt-sm lg:mt-md text-black/70">
								<span>{{ article.published_date }}</span>
								<span>{{ article.reading_time_min || "10" }} min läsning</span>
							</div>
						</header>
					</NuxtLink>
				</article>
			</div>
		</div>
	</section>
</template>
