<script setup lang="ts">
import type { Project } from "~/types/content/collections";

const { project } = defineProps<{ project: Project }>();

const slug = computed(() => `/projekt/${project.slug}`);
</script>

<template>
	<Card class="overflow-hidden">
		<NuxtLink :to="slug" :aria-label="`Läs artikel: ${project.title}`">
			<div class="h-40 overflow-hidden">
				<NuxtImg
					:src="project.cover.url"
					alt=""
					loading="lazy"
					densities="x1 x2"
					class="h-full w-full object-cover group-hover:scale-105 transition transform duration-300" />
			</div>

			<div class="flex flex-col flex-1 py-lg px-md">
				<div class="flex w-full justify-between items-center gap-lg">
					<h3 class="text-lg font-bold text-dark duration-300 group-hover:text-primary">
						{{ project.title }}
					</h3>

					<div class="flex flex-wrap">
						<span v-for="service in project.services" :key="service.id" class="text-dark text-xs px-xs">
							{{ service.title }}
						</span>
					</div>
				</div>
			</div>
		</NuxtLink>
	</Card>
</template>
