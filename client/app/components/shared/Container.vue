<script setup lang="ts">
import type { Size } from "~/types/enums";

withDefaults(defineProps<{ size?: Size }>(), {
	size: "2xl",
});

const sizeClass: Record<Size, string> = {
	"2xs": "max-w-[320px]",
	xs: "max-w-[480px]",
	sm: "max-w-[768px]",
	md: "max-w-[1024px]",
	lg: "max-w-[1200px]",
	xl: "max-w-[1400px]",
	"2xl": "max-w-[1600px]",
};
</script>

<template>
	<div
		class="mx-auto w-full h-full px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl max-w-[1600px]"
		:class="[sizeClass[size]]">
		<slot />
	</div>
</template>
