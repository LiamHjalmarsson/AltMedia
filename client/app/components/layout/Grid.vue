<script setup lang="ts">
import type { Size } from "~/types/enums";

defineProps<{ gap?: Size }>();

const gapSize: Record<Size, string> = {
	xxs: "gap-xxs",
	xs: "gap-xs",
	sm: "gap-sm",
	md: "gap-md",
	lg: "gap-lg",
	xl: "gap-xl",
	xxl: "gap-xxl",
};
</script>

<template>
	<div :class="['grid', gap && gapSize[gap] ? gapSize[gap] : 'gap-md md:gap-lg lg:gap-xl xl:gap-xxl']">
		<slot />
	</div>
</template>
