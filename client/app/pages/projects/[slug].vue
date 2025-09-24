<script setup lang="ts">
const route = useRoute();

const projectStore = useProjectStore();

const { currentProject } = storeToRefs(projectStore);

watch(
	() => route.params.slug,
	async (slug) => {
		if (typeof slug === "string") {
			await projectStore.fetchProject(slug);
		}
	},
	{ immediate: true }
);
</script>

<template>
	<Section>
		<Container>
			<Hero v-if="currentProject?.hero" :block="currentProject.hero" />

			<Introduction v-if="currentProject?.introduction" :block="currentProject.introduction" />

			<BlocksRenderer v-if="currentProject?.blocks" :blocks="currentProject.blocks" />
		</Container>
	</Section>
</template>
