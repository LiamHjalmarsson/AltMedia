<script setup lang="ts">
import type { Project } from "~/types/collectionTypes/project";

defineProps<{ projects: Project[] }>();

const { registerProjectCardElement, handleProjectCardMouseEnter, handleProjectCardMouseLeave } = useProject();
</script>

<template>
	<div class="hidden lg:flex gap-lg min-w-0">
		<article
			v-for="(project, index) in projects"
			:key="project.id"
			:ref="(element) => registerProjectCardElement(element as Element | null, index)"
			@mouseenter="handleProjectCardMouseEnter(index)"
			@mouseleave="handleProjectCardMouseLeave()"
			class="overflow-hidden shadow-xl relative h-96 flex-1 transition-transform">
			<FeaturedProjectCard :project="project" />
		</article>
	</div>

	<div class="grid grid-cols-2 sm:grid-cols-3 gap-md lg:hidden">
		<FeaturedProjectCard
			v-for="(project, index) in projects"
			:key="project.id"
			:project="project"
			:class="[
				'overflow-hidden shadow-xl relative aspect-[4/3]',
				index % 5 === 0 ? 'col-span-2' : '',
				index % 7 === 0 ? 'row-span-2' : '',
			]" />
	</div>
</template>
