<script setup lang="ts">
import type { Image } from "~/types";

const props = defineProps<{ logo: Image }>();

const logoAltText = computed(() => props.logo?.alternativeText || "Alt Media logotyp");
</script>

<template>
	<NuxtLink to="/" aria-label="Alt Media startsida" class="flex items-center w-40 h-[30px]">
		<NuxtImg
			:src="logo?.url"
			:alt="logoAltText"
			width="160"
			height="30"
			format="webp,avif"
			quality="85"
			loading="eager" />
	</NuxtLink>
</template>
