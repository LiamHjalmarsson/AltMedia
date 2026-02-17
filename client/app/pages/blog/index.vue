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

// Derive the latest article from the sorted articles array
const latestArticle = computed(() =>
	articles.value?.length
		? [...articles.value].sort(
				(a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime(),
			)[0]
		: null,
);

const remainingArticles = computed(() => (articles.value?.length > 1 ? articles.value.slice(1) : []));

const publishedDate = computed(() =>
	latestArticle.value?.published_date
		? new Intl.DateTimeFormat("sv-SE", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}).format(new Date(latestArticle.value.published_date))
		: null,
);

const readingTime = computed(() =>
	latestArticle.value?.reading_time_min ? `${latestArticle.value.reading_time_min} min läsning` : null,
);

useAppHead(page?.value?.seo || undefined);
</script>

<template>
	<section class="relative overflow-hidden pt-4xl lg:pt-5xl min-h-[70vh] flex justify-center items-center">
		<div class="mx-auto w-full max-w-[1400px] px-sm md:px-lg xl:px-2xl">
			<div class="flex max-lg:flex-col gap-xl lg:gap-2xl 2xl:gap-4xl lg:items-center max-h-[750px]">
				<div class="order-2 xl:order-1 flex-1">
					<h1 class="text-heading-lg md:text-heading-xl lg:text-heading-2xl xl:text-heading-3xl">
						{{ latestArticle?.title }}
					</h1>

					<p
						v-if="latestArticle?.description"
						class="mt-md lg:mt-lg xl:mt-2xl text-lg md:text-xl lg:text-2xl xl:text-3xl text-black/80 max-w-[62ch]">
						{{ latestArticle.description }}
					</p>

					<div
						class="mt-md lg:mt-lg xl:mt-2xl flex items-center max-md:justify-center gap-lg text-sm lg:text-lg text-black/70">
						<p v-if="publishedDate">{{ publishedDate }}</p>
						<span v-if="publishedDate && readingTime" class="h-3 w-px bg-black/15" />
						<p v-if="readingTime">{{ readingTime }}</p>
					</div>
				</div>

				<div class="order-1 xl:order-2 flex-1 lg:min-w-[400px]">
					<NuxtLink
						v-if="latestArticle"
						:to="`/blogg/${latestArticle.slug}`"
						:aria-label="`Läs artikel: ${latestArticle.title}`">
						<div
							class="relative w-full overflow-hidden bg-black/5 shadow-sm aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] max-lg:max-h-[250px] rounded-4xl">
							<NuxtImg
								class="absolute inset-0 w-full h-full object-cover"
								:src="latestArticle?.cover?.url"
								:alt="latestArticle?.cover?.alternativeText || latestArticle?.title"
								format="webp,avif"
								quality="85"
								loading="lazy"
								sizes="(max-width: 1024px) 100vw, 50vw" />
						</div>
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>

	<section class="relative pb-2xl flex justify-center">
		<div class="w-full max-w-[1400px] px-sm md:px-lg xl:px-2xl">
			<div class="grid md:grid-cols-3 gap-lg" :class="[page?.title ? '' : 'pt-2xl']">
				<article
					v-for="article in remainingArticles"
					:key="article.id"
					class="group transition-transform duration-500">
					<NuxtLink :to="`/blogg/${article.slug}`" :aria-label="`Läs artikel: ${article.title}`">
						<figure class="overflow-hidden block shadow-lg rounded-4xl">
							<NuxtImg
								v-if="article.cover?.url"
								:src="article.cover.url"
								:alt="article.cover.alternativeText || article.title"
								format="webp,avif"
								quality="85"
								loading="lazy"
								class="w-full h-60 lg:h-[250px] object-cover group-hover:scale-105 transition duration-300" />
						</figure>

						<header class="mt-lg">
							<h2
								class="font-bold text-heading-xs md:text-heading-xs lg:text-heading-sm xl:text-heading-md tracking-tighter lg:group-hover:text-primary transition-colors duration-300 line-clamp-2">
								{{ article.title }}
							</h2>

							<div
								v-if="article.published_date"
								class="flex justify-between items-center text-2xs md:text-xs mt-sm lg:mt-md text-black/70">
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
