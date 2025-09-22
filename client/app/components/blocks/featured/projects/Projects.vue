<script setup lang="ts">
import type { FeaturedProjectsBlock } from "~/types/content/blocks";
const { block } = defineProps<{ block: FeaturedProjectsBlock }>();
</script>

<template>
	<Section>
		<Container>
			<div class="flex justify-between items-center mb-sm md:mb-md lg:mb-lg xl:mb-xl">
				<Heading v-bind="block.heading" />
			</div>

			<div class="flex space-x-lg">
				<ProjectsItem v-for="project in block.projects" :key="project.id" :project />
			</div>
		</Container>
	</Section>
</template>
