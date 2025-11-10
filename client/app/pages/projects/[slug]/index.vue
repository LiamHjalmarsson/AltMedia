<script setup lang="ts">
const route = useRoute();

const projectStore = useProjectStore();

const { currentProject } = storeToRefs(projectStore);

const slug = computed(() => route.params.slug as string);

await useAsyncData(
	() => `project:${slug.value}`,
	() => projectStore.fetchProject(slug.value),
	{ server: true, lazy: true, watch: [slug] }
);
</script>

<template>
	<Hero v-if="currentProject?.hero" :block="currentProject?.hero" />

	<Introduction v-if="currentProject?.introduction" :block="currentProject.introduction" />

	<BlockRenderer v-if="currentProject?.blocks" :blocks="currentProject.blocks" />
</template>
