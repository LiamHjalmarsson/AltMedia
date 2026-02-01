<script setup lang="ts">
import type { Media } from "~/types/media";

const props = defineProps<{
	media: Media | null;
}>();

const isVideo = computed(() => {
	return props.media?.mime?.startsWith("video/");
});
</script>

<template>
	<video
		v-if="media && isVideo"
		autoplay
		muted
		loop
		playsinline
		preload="none"
		aria-hidden="true"
		class="w-full h-full object-cover">
		<source :src="media.url" :type="media.mime" />
	</video>

	<NuxtImg
		v-else-if="media"
		:src="media.url"
		format="webp,avif"
		aria-hidden="true"
		loading="lazy"
		quality="85"
		class="w-full h-full object-cover" />
</template>
