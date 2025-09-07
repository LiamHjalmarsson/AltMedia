<script setup lang="ts">
import type { FeaturedProjectsBlock } from "~/types/content/blocks";
const { block } = defineProps<{ block: FeaturedProjectsBlock }>();
</script>

<template>
	<Section>
		<Container>
			<div class="flex justify-between items-center mb-sm md:mb-md lg:mb-lg xl:mb-xl">
				<Heading :title="block.heading.title" :alignContent="block.heading.align_content" />
			</div>

			<div class="flex space-x-lg">
				<FeaturedProjectsBlockItem v-for="project in block.projects" :key="project.id" :project />
			</div>
		</Container>
	</Section>
</template>
