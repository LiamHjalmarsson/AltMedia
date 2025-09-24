<script setup lang="ts">
const serviceStore = useServiceStore();

const route = useRoute();

const { currentSubService } = storeToRefs(serviceStore);

watch(
	() => route.params.subslug,
	async (subslug) => {
		if (typeof subslug === "string") {
			await serviceStore.fetchSubService(subslug);
		} else {
			serviceStore.currentSubService = null;
		}
	},
	{ immediate: true }
);
</script>

<template>
	<Hero v-if="currentSubService?.hero" :block="currentSubService.hero" />

	<Introduction v-if="currentSubService?.introduction" :block="currentSubService.introduction" />

	<BlocksRenderer v-if="currentSubService?.blocks" :blocks="currentSubService.blocks" />
</template>
