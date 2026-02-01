<script setup lang="ts">
import type { Media } from "~/types/media";

defineProps<{ image: Media; title: string }>();
</script>

<template>
	<div class="overflow-hidden max-lg:w-72 max-lg:m-auto">
		<NuxtImg
			v-if="image.url"
			:src="image.url"
			:alt="image.alternativeText || title"
			format="webp,avif"
			quality="70"
			width="450"
			height="450"
			sizes="(max-width: 768px) 100vw, 50vw"
			loading="lazy"
			class="w-full h-full object-contain object-bottom-left max-h-[260px] lg:max-h-[380px]" />
	</div>
</template>
