<script setup lang="ts">
import type { Size } from "~/types/enums";

withDefaults(defineProps<{ size?: Size }>(), {
	size: "xxl",
});

const sizeClass: Record<Size, string> = {
	xxs: "max-w-[320px]",
	xs: "max-w-[480px]",
	sm: "max-w-[768px]",
	md: "max-w-[1024px]",
	lg: "max-w-[1200px]",
	xl: "max-w-[1400px]",
	xxl: "max-w-[1600px]",
};
</script>

<template>
	<div class="mx-auto w-full h-full p-xs xs:p-sm sm:md md:p-lg lg:p-xxl" :class="[sizeClass[size]]">
		<slot />
	</div>
</template>
