<script setup lang="ts">
const articleStore = useArticleStore();

const { articles } = storeToRefs(articleStore);

await useAsyncData("articles", () => articleStore.fetchArticles(), { server: true });
</script>

<template>
	<section class="relative py-4xl lg:py-5xl flex justify-center">
		<div class="w-full max-w-[1300px] px-md md:px-lg lg:px-2xl">
			<Heading title="Våra artiklar" align_content="start" class="my-xl" />

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
