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

// watchEffect(() => {
// 	useAppHead(currentSubService.value?.seo || undefined);
// });
</script>

<template>
	<Hero v-if="currentSubService?.hero" :block="currentSubService.hero" />

	<SubserviceIntroduction v-if="currentSubService" :subservice="currentSubService" />

	<BlockRenderer v-if="currentSubService?.blocks" :blocks="currentSubService.blocks" />
</template>
