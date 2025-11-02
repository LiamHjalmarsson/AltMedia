<script setup lang="ts">
import type { Image } from "~/types/shared";

defineProps<{ image: Image; title: string }>();
</script>

<template>
	<div class="overflow-hidden">
		<NuxtImg
			v-if="image.url"
			:src="image.url"
			:alt="image.alternativeText || title"
			format="webp"
			quality="85"
			class="w-full h-full object-contain max-h-[200px] lg:max-h-[450px]"
			loading="lazy" />
	</div>
</template>
