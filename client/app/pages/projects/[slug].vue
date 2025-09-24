<script setup lang="ts">
const route = useRoute();

const projectStore = useProjectStore();

await useAsyncData("project", () => projectStore.fetchProjectBySlug(route.params.slug as string), { server: true });

const { currentProject } = storeToRefs(projectStore);
</script>

<template>
	<Hero :block="currentProject?.hero" />

	<Introduction v-if="currentProject?.introduction" :block="currentProject.introduction" />

	<BlocksRenderer :blocks="currentProject?.blocks || []" />
</template>
