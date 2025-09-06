<script setup lang="ts">
import type { Size } from "~/types/enums";

defineProps<{ gap?: Size }>();

const sizeClass: Record<Size, string> = {
	xxs: "gap-2xs",
	xs: "gap-xs",
	sm: "gap-sm",
	md: "gap-md",
	lg: "gap-lg",
	xl: "gap-xl",
	xxl: "gap-2xl",
};
</script>

<template>
	<div :class="['grid', gap && sizeClass[gap] ? sizeClass[gap] : 'gap-md md:gap-lg lg:gap-xl xl:gap-xxl']">
		<slot />
	</div>
</template>
