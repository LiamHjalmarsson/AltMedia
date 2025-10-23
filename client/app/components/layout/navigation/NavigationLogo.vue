<script setup lang="ts">
import type { Image } from "~/types/shared";

const props = defineProps<{ logo: Image }>();

const logoAltText = computed(() => props.logo?.alternativeText || "Alt Media logotyp");
</script>

<template>
	<NuxtLink to="/" aria-label="Alt Media startsida" class="flex items-center">
		<NuxtImg
			:src="logo?.url"
			:alt="logoAltText"
			width="160"
			height="30"
			format="webp"
			quality="85"
			loading="eager" />
	</NuxtLink>
</template>
