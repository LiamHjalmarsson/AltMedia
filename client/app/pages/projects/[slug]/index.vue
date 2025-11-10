<script setup lang="ts">
const route = useRoute();

const projectStore = useProjectStore();

const { currentProject } = storeToRefs(projectStore);

await useAsyncData(
	() => `project-${route.params.slug}`,
	async () => {
		if (typeof route.params.slug === "string") {
			return await projectStore.fetchProject(route.params.slug);
		}
		return null;
	},
	{ watch: [() => route.params.slug], server: true }
);
</script>

<template>
	<Hero v-if="currentProject?.hero" :block="currentProject?.hero" />

	<Introduction v-if="currentProject?.introduction" :block="currentProject.introduction" />

	<BlockRenderer v-if="currentProject?.blocks" :blocks="currentProject.blocks" />
</template>
