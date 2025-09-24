<script setup lang="ts">
import type { Project } from "~/types/content/collections";

defineProps<{ project: Project }>();
</script>

<template>
	<article>
		<h1 class="text-heading-xl font-bold mb-md">{{ project.title }}</h1>

		<p v-if="project.client" class="text-dark-gray mb-md">Kund: {{ project.client }}</p>

		<NuxtImg v-if="project.cover?.url" :src="project.cover.url" class="rounded-xl shadow-lg mb-xl" />

		<StrapiBlocksText :nodes="project.introduction?.description || []" />
	</article>
</template>
