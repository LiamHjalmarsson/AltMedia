<script setup lang="ts">
import type { Project } from "~/types/content/collections";

defineProps<{ projects: Project[] }>();
</script>

<template>
	<div class="grid grid-cols-3 gap-md md:gap-lg lg:gap-xl xl:gap-2xl">
		<ProjectCard v-for="project in projects" :key="project.id" :project="project" />
	</div>
</template>
