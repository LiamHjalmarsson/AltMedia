<script setup lang="ts">
import type { Article } from "~/types/content/collections";

const { article } = defineProps<{ article: Article }>();

const slug = computed(() => `/articles/${article.slug}`);
</script>

<template>
	<Card class="overflow-hidden">
		<NuxtLink :to="slug" :aria-label="`Läs artikel: ${article.title}`">
			<div class="h-40 overflow-hidden">
				<NuxtImg
					:src="article.cover.url"
					alt=""
					loading="lazy"
					densities="x1 x2"
					class="h-full w-full object-cover group-hover:scale-105 transition transform duration-300" />
			</div>

			<div class="flex flex-col justify-between flex-1 p-md">
				<h3 class="text-lg font-bold text-dark duration-300 group-hover:text-primary line-clamp-2">
					{{ article.title }}
				</h3>

				<div v-if="article.description" class="mt-xxs">
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
</template>
