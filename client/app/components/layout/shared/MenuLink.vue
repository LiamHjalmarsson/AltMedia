<script setup lang="ts">
import type { MenuLink } from "~/types/content/singles";

defineProps<{ link: MenuLink }>();
</script>

<template>
	<NuxtLink
		:to="link.url"
		class="font-semibold text-sm cursor-pointer relative inline-block hover:text-primary transition-transform duration-300">
		{{ link.label }}

		<span class="absolute -bottom-1 left-1/2 h-0.5 bg-primary transition-all duration-300" />
	</NuxtLink>
</template>
