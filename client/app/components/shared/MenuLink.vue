<script setup lang="ts">
import type { MenuLink } from "~/types/content/singles";

defineProps<{ link: MenuLink }>();
</script>

<template>
	<NuxtLink
		:to="link.url"
		class="font-bold text-md cursor-pointer relative inline-block transition-transform duration-300">
		{{ link.label }}

		<span class="absolute -bottom-1 left-1/2 h-0.5 bg-primary transition-all duration-300" />
	</NuxtLink>
</template>
