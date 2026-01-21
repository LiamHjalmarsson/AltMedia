<script setup lang="ts">
const props = defineProps<{
	media: { url: string; mime?: string } | null;
	overlay?: boolean | string;
}>();

const isVideo = computed(() => {
	return props.media?.mime?.startsWith("video/");
});

const showOverlay = computed(() => props.overlay !== false);

const overlayClass = computed(() => {
	if (props.overlay === true) {
		return "bg-black/50";
	}

	if (typeof props.overlay === "string") {
		return props.overlay;
	}

	return "bg-black/50";
});
</script>

<template>
	<div class="absolute inset-0 w-full h-full overflow-hidden">
		<video
			v-if="media && isVideo"
			autoplay
			muted
			loop
			playsinline
			preload="none"
			aria-hidden="true"
			class="absolute inset-0 w-full h-full object-cover">
			<source :src="media.url" :type="media.mime" />
		</video>

		<NuxtImg
			v-else-if="media"
			:src="media.url"
			format="webp,avif"
			aria-hidden="true"
			loading="lazy"
			quality="85"
			class="absolute inset-0 w-full h-full object-cover" />
		<!-- 
		<div
			v-if="showOverlay"
			aria-hidden="true"
			class="absolute inset-0 pointer-events-none z-10"
			:class="overlayClass" /> -->
	</div>
</template>
