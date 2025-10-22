<script setup lang="ts">
import type { FeaturedArticlesBlock } from "~/types/content/blocks";

defineProps<{ block: FeaturedArticlesBlock }>();
</script>

<template>
	<section class="relative w-full flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl">
		<div class="mx-auto w-full h-full px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl max-w-[1600px]">
			<div class="mb-sm md:mb-md lg:mb-lg xl:mb-xl">
				<Heading v-bind="block.heading" :align_content="block.heading.align_content" />
			</div>

			<div class="grid md:grid-cols-3 gap-md md:gap-lg lg:gap-xl xl:gap-2xl">
				<div
					v-for="article in block.articles"
					:key="article.id"
					class="overflow-hidden flex flex-col rounded-xl group transition transform duration-300 shadow-lg">
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

								<button
									type="button"
									aria-label="Läs mer om innehållet"
									class="inline-flex items-center text-sm font-semibold text-primary cursor-pointer group focus-visible:outline-primary min-h-[44px] min-w-[44px] ml-auto">
									Läs mer
									<span
										class="opacity-0 -translate-x-xs transition-all duration-300 pl-sm group-hover:opacity-100 group-hover:translate-x-0 flex justify-center items-center">
										<Icon name="heroicons:arrow-long-right-20-solid" size="16" />
									</span>
								</button>
							</div>
						</div>
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>
</template>
