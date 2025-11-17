<script setup lang="ts">
import type { MenuLink } from "~/types";
defineProps<{ link: MenuLink }>();
</script>

<template>
	<NuxtLink
		:to="link.url"
		class="font-bold text-md relative inline-block transition-colors duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
		{{ link.label }}

		<span
			aria-hidden="true"
			class="absolute -bottom-1 left-1/2 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0" />
	</NuxtLink>
</template>
