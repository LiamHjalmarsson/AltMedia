<script setup lang="ts">
import type { Media } from "~/types/media";

const props = defineProps<{ logo: Media }>();

const logoAltText = computed(() => props.logo?.alternativeText || "Alt Media");
</script>

<template>
	<NuxtLink to="/" aria-label="Till Alt Media startsida" class="flex w-40 h-[30px] items-center">
		<NuxtImg :src="logo.url" :alt="logoAltText" format="webp,avif" quality="85" loading="eager" />
	</NuxtLink>
</template>
