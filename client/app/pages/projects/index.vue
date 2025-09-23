<script setup lang="ts">
const projectStore = useProjectStore();

const { projects } = storeToRefs(projectStore);

await useAsyncData("projects", () => projectStore.fetchProjects(), { server: true });
</script>

<template>
	<Section>
		<Container>
			<Heading :has_link="false" title="Våra Projekt" align_content="center" class="mt-xxl" />

			<Grid class="grid-cols-3 gap-2xl">
				<ProjectCard v-for="project in projects" :key="project.id" :project="project" />
			</Grid>
		</Container>
	</Section>
</template>
