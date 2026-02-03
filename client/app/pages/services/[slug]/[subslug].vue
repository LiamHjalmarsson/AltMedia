<script setup lang="ts">
const serviceStore = useServiceStore();

const route = useRoute();

const { subService } = storeToRefs(serviceStore);

const subslug = computed(() => route.params.subslug as string);

await useAsyncData(
	() => `subservice:${subslug.value}`,
	() => serviceStore.fetchSubService(subslug.value),
	{ server: true, lazy: true, watch: [subslug] },
);

// watchEffect(() => {
// 	useAppHead(currentSubService.value?.seo || undefined);
// });
</script>

<template>
	<Hero v-if="subService?.hero" :block="subService.hero" />

	<BlockRenderer v-if="subService?.blocks" :blocks="subService.blocks" />
</template>
