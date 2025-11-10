<script setup lang="ts">
const serviceStore = useServiceStore();

const route = useRoute();

const { currentSubService } = storeToRefs(serviceStore);

const subslug = computed(() => route.params.subslug as string);

await useAsyncData(
	() => `subservice:${subslug.value}`,
	() => serviceStore.fetchSubService(subslug.value),
	{ server: true, lazy: true, watch: [subslug] }
);

watchEffect(() => {
	const subservice = currentSubService.value;

	useSeoMeta({
		title: subservice?.title ?? "Delmoment",
		description: "Delmoment i en tjänst.",
		ogTitle: subservice?.title ?? "Delmoment",
		ogDescription: "Delmoment i en tjänst.",
		twitterCard: "summary_large_image",
	});
});
</script>

<template>
	<Hero v-if="currentSubService?.hero" :block="currentSubService.hero" />

	<SubserviceIntroduction v-if="currentSubService" :subservice="currentSubService" />

	<BlockRenderer v-if="currentSubService?.blocks" :blocks="currentSubService.blocks" />
</template>
