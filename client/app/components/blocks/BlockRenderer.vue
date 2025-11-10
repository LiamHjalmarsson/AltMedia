<script setup lang="ts">
import type { Blocks } from "~/types/content/blocks";

defineProps<{ blocks: Blocks[] }>();

const map: Record<string, any> = {
	"block.hero": defineAsyncComponent(() => import("~/components/blocks/hero/Hero.vue")),
	"block.list": defineAsyncComponent(() => import("~/components/blocks/list/List.vue")),
	"block.full-section": defineAsyncComponent(() => import("~/components/blocks/fullSection/FullSection.vue")),
	"block.faq": defineAsyncComponent(() => import("~/components/blocks/faq/Faq.vue")),
	"block.info": defineAsyncComponent(() => import("~/components/blocks/info/Info.vue")),
	"block.featured": defineAsyncComponent(() => import("~/components/blocks/featured/Featured.vue")),
	"block.examples-build": defineAsyncComponent(() => import("~/components/blocks/examplesBuild/ExamplesBuild.vue")),
};
</script>

<template>
	<component
		v-for="block in blocks"
		:key="`${block.__component}-${block.id}`"
		:is="map[block.__component] || 'div'"
		:block="block" />
</template>
