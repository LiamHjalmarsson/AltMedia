<script setup lang="ts">
import type { Article } from "~/types/content/collections";

defineProps<{ article: Article }>();
</script>

<template>
	<div class="overflow-hidden group cursor-pointer">
		<NuxtLink :to="`/articles/${article.slug}`" :aria-label="`Läs artikel: ${article.title}`">
			<div class="h-40 overflow-hidden">
				<NuxtImg
					:src="article.cover.url"
					:alt="article.cover.alternativeText || article.title"
					format="webp,avif"
					quality="85"
					loading="lazy"
					class="h-full w-full object-cover group-hover:scale-105 transition duration-300" />
			</div>

			<div class="flex flex-col justify-between flex-1 mt-md">
				<div class="flex-1">
					<h3 class="text-2xl font-bold duration-300 group-hover:text-primary">
						{{ article.title }}
					</h3>
				</div>

				<div class="flex items-center justify-between">
					<div class="text-xs text-dark-gray">
						<span v-if="article.published_date">
							{{ article.published_date }}
						</span>
						<span v-if="article.reading_time_min"> {{ article.reading_time_min }} min </span>
					</div>

					<ReadMoreButton />
				</div>
			</div>
		</NuxtLink>
	</div>
</template>
