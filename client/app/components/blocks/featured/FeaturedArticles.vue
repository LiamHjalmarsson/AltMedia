<script setup lang="ts">
import type { FeaturedArticlesBlock } from "~/types/content/blocks";

defineProps<{ block: FeaturedArticlesBlock }>();
</script>

<template>
	<Section>
		<Container>
			<div class="mb-sm md:mb-md lg:mb-lg xl:mb-xl">
				<Heading v-bind="block.heading" :align_content="block.heading.align_content" />
			</div>

			<Grid class="md:grid-cols-3">
				<Card v-for="article in block.articles" :key="article.id" class="overflow-hidden">
					<NuxtLink :to="`/articles/${article.slug}`" :aria-label="`Läs artikel: ${article.title}`">
						<div class="h-40 overflow-hidden">
							<NuxtImg
								:src="article.cover.url"
								:alt="article.cover.alternativeText || article.title"
								densities="x1 x2"
								width="600"
								height="400"
								sizes="100vw sm:50vw md:33vw"
								format="webp"
								quality="85"
								placeholder
								loading="lazy"
								class="h-full w-full object-cover group-hover:scale-105 transition transform duration-300" />
						</div>

						<div class="flex flex-col justify-between flex-1 p-md">
							<h3 class="text-lg font-bold text-dark duration-300 group-hover:text-primary line-clamp-2">
								{{ article.title }}
							</h3>

							<div v-if="article.description" class="mt-2xs">
								<p class="text-dark-gray line-clamp-3">
									{{ article.description }}
								</p>
							</div>

							<div class="mt-auto flex items-center justify-between pt-sm">
								<div class="text-xs text-dark-gray">
									<div v-if="article.published_date">{{ article.published_date }}</div>
									<div v-if="article.reading_time_min">{{ article.reading_time_min }} min</div>
								</div>

								<ReadMoreButton class="ml-auto" />
							</div>
						</div>
					</NuxtLink>
				</Card>
			</Grid>
		</Container>
	</Section>
</template>
