<script setup lang="ts">
import type { Project } from "~/types/content/collections";
const { project } = defineProps<{ project: Project }>();
const slug = computed(() => `/projects/${project.slug}`);
</script>

<template>
	<article
		class="flex flex-col overflow-hidden rounded-2xl bg-light/5 backdrop-blur-md border border-light/10 shadow-xl transition-all duration-300 group hover:shadow-2xl">
		<NuxtLink :to="slug" :aria-label="`Läs mer om ${project.title}`" class="flex flex-col h-full">
			<div class="relative overflow-hidden aspect-[4/3]">
				<NuxtImg
					:src="project.cover?.url"
					:alt="project.cover?.alternativeText || project.title"
					format="webp,avif"
					quality="85"
					class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
					loading="lazy" />

				<div
					class="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent opacity-60 group-hover:opacity-80 transition" />
				<span class="absolute bottom-sm left-sm text-xs px-sm py-2xs rounded-full bg-primary/80 font-medium">
					{{ project.services[0]?.title || "Projekt" }}
				</span>
			</div>

			<div class="flex flex-col justify-between flex-1 p-xl">
				<div>
					<h3 class="text-heading-sm md:text-heading-md font-semibold group-hover:text-primary transition">
						{{ project.title }}
					</h3>

					<p class="text-sm mt-sm line-clamp-3 leading-relaxed">ddd</p>
				</div>

				<div class="mt-lg flex justify-between items-center">
					<ReadMoreButton />
					<span class="text-xs font-medium"> 1995 </span>
				</div>
			</div>
		</NuxtLink>
	</article>
</template>
