<script setup lang="ts">
import type { Article } from "~/types";

defineProps<{ article: Article }>();
</script>

<template>
	<NuxtLink
		:to="`/articles/${article.slug}`"
		:aria-label="`Läs artikel: ${article.title}`"
		class="overflow-hidden group cursor-pointer relative pb-2xl border-b flex space-x-2xl">
		<div class="h-56 xl:h-48 relative overflow-hidden w-2/5">
			<NuxtImg
				:src="article.cover.url"
				:alt="article.cover.alternativeText || article.title"
				format="webp,avif"
				quality="85"
				loading="lazy"
				class="h-full w-full object-cover" />
		</div>

		<div class="flex flex-col justify-between flex-1 mt-md">
			<div class="flex-1">
				<h3 class="text-heading-md font-bold duration-300 group-hover:text-primary">
					{{ article.title }}
				</h3>
				<p class="mt-sm text-black/80 line-clamp-3 xl:hidden">
					{{ article.description }}
				</p>
			</div>

			<div class="flex items-center justify-between mt-sm">
				<div class="text-xs text-black/80">
					<span v-if="article.published_date">
						{{ article.published_date }}
					</span>
					<span v-if="article.reading_time_min"> {{ article.reading_time_min }} min </span>
				</div>
			</div>
		</div>
	</NuxtLink>
</template>
