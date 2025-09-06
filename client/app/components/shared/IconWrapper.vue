<script setup lang="ts">
import type { Size } from "~/types/enums";

const props = withDefaults(
	defineProps<{
		size?: Size;
	}>(),
	{ size: "md" }
);

const sizeClass: Record<Size, string> = {
	xxs: "w-6 h-6 p-xxs",
	xs: "w-7 h-7 p-xxs",
	sm: "w-8 h-8 p-xxs",
	md: "w-10 h-10 p-xs",
	lg: "w-12 h-12 p-xs",
	xl: "w-16 h-16 p-xs",
	xxl: "w-20 h-20 p-sm",
};
</script>

<template>
	<div
		class="flex justify-center items-center rounded-full border shadow-lg bg-light/10 text-primary"
		:class="sizeClass[props.size]">
		<slot />
	</div>
</template>
