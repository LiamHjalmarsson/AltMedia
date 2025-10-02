<script setup lang="ts">
const { element: button, backgroundColor } = useHoverAnimation();
</script>

<template>
	<button ref="button" v-bind="$attrs" class="relative font-bold py-xs px-xxl cursor-pointer">
		<span class="relative flex items-center z-10">
			<slot />
		</span>
		<span ref="backgroundColor" class="absolute top-0 left-0 h-10 w-10 bg-primary rounded-full" />
	</button>
</template>
