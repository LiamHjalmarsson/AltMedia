<script setup lang="ts">
import type { Media } from "~/types/media";

defineProps<{
	image: Media;
}>();
</script>

<template>
	<NuxtImg class="" :src="image.url" :alt="image.alternativeText" :width="image.width" :height="image.height" />
</template>
