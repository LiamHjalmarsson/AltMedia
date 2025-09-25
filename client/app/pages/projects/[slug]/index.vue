<script setup lang="ts">
import type { Hero } from "~/types/content/blocks";

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

const heroBlock = computed<Hero | null>(() => {
	if (!currentProject.value) {
		return null;
	}

	if (currentProject.value.hero) {
		return currentProject.value.hero as Hero;
	}

	return {
		__component: "block.hero",
		id: currentProject.value.id,
		title: currentProject.value.title,
		description: currentProject.value.services?.map((service) => service.title).join(", ") ?? "",
		align_content: "center",
		has_form: false,
		links: [],
		cover: currentProject.value.cover ? [currentProject.value.cover] : [],
	};
});
</script>

<template>
	<Hero v-if="heroBlock" :block="heroBlock" />

	<Introduction v-if="currentProject?.introduction" :block="currentProject.introduction" />

	<BlocksRenderer v-if="currentProject?.blocks" :blocks="currentProject.blocks" />
</template>
