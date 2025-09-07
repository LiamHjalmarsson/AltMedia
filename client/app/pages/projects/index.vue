<script setup lang="ts">
const projectStore = useProjectStore();

const { projects } = storeToRefs(projectStore);

console.log("sss", projects.value);
await useAsyncData("projects", () => projectStore.fetchProjects(), { server: true });
</script>

<template>
	<Section>
		<Container>
			<Heading :has_link="false" title="Våra Projekt" align_content="center" class="mt-xxl" />
		</Container>
	</Section>
</template>
