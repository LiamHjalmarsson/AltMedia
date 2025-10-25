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
		class="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 focus-visible:outline-primary h-full flex flex-col group bg-gradient-to-br from-bg-dark/15 to-bg-dark/5 group">
		<slot />
	</component>
</template>
