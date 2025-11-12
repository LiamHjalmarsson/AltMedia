<script setup lang="ts">
import type { Project } from "~/types";

defineProps<{ project: Project }>();
</script>

<template>
	<Card class="cursor-pointer overflow-hidden relative">
		<NuxtLink :to="`/projects/${project?.slug}`" class="block w-full h-full relative">
			<NuxtImg
				v-if="project.cover?.url"
				:src="project.cover.url"
				:alt="project.cover.alternativeText || ''"
				format="webp,avif"
				quality="85"
				loading="lazy"
				class="object-cover w-full h-full" />

			<div class="project-overlay absolute inset-0 bg-bg-dark opacity-0" />

			<h3
				class="project-title hidden lg:block font-semibold absolute inset-x-0 bottom-10 z-10 text-light text-center px-md text-heading-md sm:text-heading-lg md:text-heading-xl lg:text-heading-2xl xl:text-heading-3xl tracking-tight leading-tight">
				{{ project.title }}
			</h3>

			<div
				class="absolute inset-0 flex items-end justify-start p-sm bg-gradient-to-t from-black/95 to-transparent lg:hidden">
				<h3 class="text-light text-sm sm:text-md font-semibold">
					{{ project.title }}
				</h3>
			</div>
		</NuxtLink>
	</Card>
</template>
