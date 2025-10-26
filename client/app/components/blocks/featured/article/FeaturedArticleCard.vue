<script setup lang="ts">
import type { Article } from "~/types/content/collections";

defineProps<{ article: Article }>();
</script>

<template>
	<div class="overflow-hidden transform duration-300">
		<NuxtLink :to="`/articles/${article.slug}`" :aria-label="`Läs artikel: ${article.title}`">
			<div class="h-40 overflow-hidden">
				<NuxtImg
					:src="article.cover.url"
					:alt="article.cover.alternativeText || article.title"
					format="webp"
					quality="85"
					loading="lazy"
					class="h-full w-full object-cover group-hover:scale-105 transition transform duration-300" />
			</div>

			<div class="flex flex-col justify-between flex-1 p-md">
				<div class="flex-1">
					<h3 class="text-lg font-bold duration-300 group-hover:text-primary line-clamp-2">
						{{ article.title }}
					</h3>

					<div v-if="article.description" class="mt-2xs">
						<p class="text-dark-gray line-clamp-3">
							{{ article.description }}
						</p>
					</div>
				</div>

				<div class="mt-auto flex items-center justify-between pt-sm">
					<div class="text-xs text-dark-gray">
						<span v-if="article.published_date">
							{{ article.published_date }}
						</span>
						<span v-if="article.reading_time_min"> {{ article.reading_time_min }} min </span>
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
</template>
