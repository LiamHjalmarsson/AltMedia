<script setup lang="ts">
const props = defineProps<{
	media: {
		url: string;
		mime?: string;
	} | null;
	opacityClass?: string;
}>();

const isVideo = computed(() => {
	return props.media?.mime?.startsWith("video/");
});
</script>

<template>
	<div class="absolute inset-0 w-full h-full" :class="opacityClass">
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
			class="w-full h-full object-cover" />s
	</div>
</template>
