<script setup lang="ts">
import type { Blocks } from "~/types/content/blocks";

defineProps<{ blocks: Blocks[] }>();

const map: Record<string, any> = {
	"block.hero": resolveComponent("Hero"),
	"block.list": resolveComponent("List"),
	"block.full-section": resolveComponent("FullSection"),
	"block.faq": resolveComponent("Faq"),
	"block.info": resolveComponent("Info"),
	"block.featured": resolveComponent("Featured"),
	"block.examples-build": resolveComponent("ExamplesBuild"),
};
</script>

<template>
	<component
		v-for="block in blocks"
		:key="`${block.__component}-${block.id}`"
		:is="map[block.__component] || 'div'"
		:block="block" />
</template>
