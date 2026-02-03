<script setup lang="ts">
import type { Article } from "~/types/collectionTypes/article";

defineProps<{ article: Article }>();
</script>

<template>
	<NuxtLink
		:to="buildBlogPostPath(article.slug)"
		:aria-label="`Läs artikel: ${article.title}`"
		class="overflow-hidden group cursor-pointer relative pb-lg lg:pb-2xl border-b flex max-md:flex-col space-x-2xl">
		<div class="h-40 lg:h-56 relative overflow-hidden w-full md:w-2/5">
			<NuxtImg
				v-if="article.cover.url"
				:src="article.cover.url"
				:alt="article.cover.alternativeText || article.title"
				format="webp,avif"
				quality="85"
				loading="lazy"
				class="h-full w-full object-cover absolute inset-0 group-hover:scale-110 duration-300" />
		</div>

		<div class="flex flex-col justify-between flex-1 mt-md">
			<div class="flex-1">
				<h3
					class="font-semibold text-heading-sm md:text-heading-md lg:text-heading-lg tracking-tighter duration-300 group-hover:text-primary">
					{{ article.title }}
				</h3>
				<p class="mt-sm text-black/80 text-xs md:text-md lg:text-lg leading-[1.8] line-clamp-3">
					{{ article.description }}
				</p>
			</div>

			<div class="flex items-center justify-between mt-sm lg:mt-md">
				<div class="text-xs text-black/70">
					<span v-if="article.published_date">
						{{ article.published_date }}
					</span>
					<span v-if="article.reading_time_min"> {{ article.reading_time_min }} min </span>
				</div>
			</div>
		</div>
	</NuxtLink>
</template>
