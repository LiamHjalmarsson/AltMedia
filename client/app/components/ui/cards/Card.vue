<script setup lang="ts">
const props = defineProps<{
	as?: "article" | "div";
	hoverable?: boolean;
}>();

const tag = props.as || "div";
</script>

<template>
	<component
		:is="tag"
		class="relative shadow-lg transition-all duration-300 focus-visible:outline-primary h-full flex flex-col group">
		<slot />
	</component>
</template>
