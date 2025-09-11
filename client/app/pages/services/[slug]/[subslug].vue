<script setup lang="ts">
const serviceStore = useServiceStore();

const route = useRoute();

await useAsyncData("project", () => serviceStore.fetchService(route.params.slug as string), { server: true });

const { currentSubService } = storeToRefs(serviceStore);
</script>

<template>
	<Hero :block="currentSubService?.hero" />

	<Introduction :Introduction="currentSubService?.introduction" />

	<BlocksRenderer :blocks="currentSubService?.blocks" />
</template>
