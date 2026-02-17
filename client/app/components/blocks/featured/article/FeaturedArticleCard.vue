<script setup lang="ts">
import type { Article } from "~/types/collectionTypes/article";

defineProps<{ article: Article }>();
</script>

<template>
	<NuxtLink
		:to="buildBlogPostPath(article.slug)"
		:aria-label="`Läs artikel: ${article.title}`"
		class="overflow-hidden group cursor-pointer relative pb-lg lg:pb-2xl border-b flex max-md:flex-col md:items-stretch md:space-x-2xl">
		<div class="relative overflow-hidden w-full md:w-2/5 rounded-4xl self-stretch min-h-40 lg:min-h-56">
			<NuxtImg
				v-if="article.cover.url"
				:src="article.cover.url"
				:alt="article.cover.alternativeText || article.title"
				format="webp,avif"
				quality="85"
				loading="lazy"
				class="w-full h-full object-cover absolute inset-0 group-hover:scale-110 duration-300" />
		</div>

		<div class="flex items-center flex-1">
			<div class="space-y-lg">
				<div>
					<h3
						class="font-semibold text-heading-sm md:text-heading-md lg:text-heading-lg tracking-tighter duration-300 group-hover:text-primary">
						{{ article.title }}
					</h3>

					<p class="mt-sm text-black/80 text-lg md:text-xl xl:text-2xl line-clamp-3 font-medium">
						{{ article.description }}
					</p>
				</div>

				<div class="flex items-center justify-between">
					<div class="text-xs text-black/70">
						<span v-if="article.published_date">
							{{ article.published_date }}
						</span>
						<span v-if="article.reading_time_min"> {{ article.reading_time_min }} min </span>
					</div>
				</div>
			</div>
		</div>
	</NuxtLink>
</template>
