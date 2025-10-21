<script setup lang="ts">
import type { Size } from "~/types/enums";

defineProps<{ gap?: Size }>();

const gapSize: Record<Size, string> = {
	"2xs": "gap-2xs",
	xs: "gap-xs",
	sm: "gap-sm",
	md: "gap-md",
	lg: "gap-lg",
	xl: "gap-xl",
	"2xl": "gap-2xl",
};
</script>

<template>
	<div :class="['grid', gap && gapSize[gap] ? gapSize[gap] : 'gap-md md:gap-lg lg:gap-xl xl:gap-2xl']">
		<slot />
	</div>
</template>
