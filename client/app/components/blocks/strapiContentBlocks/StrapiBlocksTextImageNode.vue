<script setup lang="ts">
defineProps<{
	image: any;
}>();
</script>

<template>
	<NuxtImg class="" :src="image.url" :alt="image.alternativeText" :width="image.width" :height="image.height" />
</template>
