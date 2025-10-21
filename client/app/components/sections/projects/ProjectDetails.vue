<script setup lang="ts">
import type { Project } from "~/types/content/collections";

defineProps<{ project: Project }>();
</script>

<template>
	<article>
		<h1 class="text-heading-xl font-bold mb-md">{{ project.title }}</h1>

		<p v-if="project.client" class="text-dark-gray mb-md">Kund: {{ project.client }}</p>

		<NuxtImg
			v-if="project.cover?.url"
			:src="project.cover.url"
			:alt="project.cover.alternativeText || `Omslagsbild för projektet ${project.title}`"
			sizes="100vw md:80vw lg:60vw"
			densities="x1 x2"
			format="webp"
			quality="85"
			placeholder
			class="rounded-xl shadow-lg mb-xl"></NuxtImg>

		<StrapiBlocksText :nodes="project.introduction?.description || []" />
	</article>
</template>
