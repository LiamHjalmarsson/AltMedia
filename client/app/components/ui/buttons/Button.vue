<script setup lang="ts">
const { element: button, backgroundColor } = useHoverAnimation();
</script>

<template>
	<button
		ref="button"
		v-bind="$attrs"
		class="relative font-bold py-xs px-2xl cursor-pointer min-h-[44px] min-w-[44px] rounded-full focus-visible:outline-primary transition">
		<span class="relative flex items-center max-lg:justify-center z-10 max-lg:text-light">
			<slot />
		</span>

		<span ref="backgroundColor" class="absolute top-0 left-0 h-10 w-10 max-lg:hidden bg-primary rounded-full" />

		<span class="absolute top-0 left-0 h-11 w-full bg-primary rounded-full lg:hidden" />
	</button>
</template>
