<script setup lang="ts">
import type { Project } from "~/types/content/collections";

defineProps<{ projects: Project[] }>();
</script>

<template>
	<Grid class="grid-cols-3">
		<ProjectCard v-for="project in projects" :key="project.id" :project="project" />
	</Grid>
</template>
