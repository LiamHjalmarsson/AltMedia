<script setup lang="ts">
import type { Icon } from "~/types/shared";

defineProps<{ icon: Icon; title: string }>();
</script>

<template>
	<div class="overflow-hidden transition-transform duration-500 ease-out">
		<NuxtImg
			v-if="icon?.is_image && icon.image?.url"
			:src="icon.image.url"
			:alt="icon.image.alternativeText || title"
			format="webp"
			quality="85"
			class="w-full h-full object-cover max-h-[350px]"
			loading="lazy" />
	</div>
</template>
