<script setup lang="ts">
import type { Article } from "~/types/content/collections";

defineProps<{ article: Article }>();
</script>

<template>
	<div class="overflow-hidden flex flex-col rounded-xl group transition transform duration-300 shadow-lg">
		<NuxtLink :to="`/articles/${article.slug}`" :aria-label="`Läs artikel: ${article.title}`">
			<div class="h-40 overflow-hidden">
				<NuxtImg
					v-if="article.cover?.url"
					:src="article.cover.url"
					:alt="article.cover.alternativeText || ''"
					sizes="100vw sm:50vw md:33vw"
					format="webp,avif"
					quality="80"
					placeholder
					loading="lazy"
					class="h-full w-full object-cover group-hover:scale-105 transition duration-300" />
			</div>

			<div class="flex flex-col justify-between flex-1 p-md">
				<h3 class="text-lg font-bold text-dark duration-300 group-hover:text-primary line-clamp-2">
					{{ article.title }}
				</h3>

				<p v-if="article.description" class="text-dark-gray mt-xs line-clamp-3">
					{{ article.description }}
				</p>

				<div class="mt-auto flex items-center justify-between pt-sm">
					<div class="text-xs text-dark-gray">
						<div v-if="article.published_date">{{ article.published_date }}</div>
						<div v-if="article.reading_time_min">{{ article.reading_time_min }} min</div>
					</div>

					<ReadMoreButton class="ml-auto" />
				</div>
			</div>
		</NuxtLink>
	</div>
</template>
