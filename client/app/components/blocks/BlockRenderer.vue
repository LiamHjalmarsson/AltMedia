<script setup lang="ts">
import type { DefineComponent } from "vue";
import type { Blocks } from "~/types";

defineProps<{ blocks: Blocks[] }>();

type BlockKey = Blocks["__component"];

type BlockComponent = DefineComponent<{ block: Blocks }>;

type BlockMap = Record<BlockKey, BlockComponent>;

const lazy = (loader: Parameters<typeof defineAsyncComponent>[0]) =>
	defineAsyncComponent(loader) as unknown as BlockComponent;

const map: BlockMap = {
	"block.hero": lazy(() => import("~/components/blocks/hero/Hero.vue")),
	"block.list": lazy(() => import("~/components/blocks/list/List.vue")),
	"block.full-section": lazy(() => import("~/components/blocks/fullSection/FullSection.vue")),
	"block.cta": lazy(() => import("~/components/blocks/cta/Cta.vue")),
	"block.faq": lazy(() => import("~/components/blocks/faq/Faq.vue")),
	"block.info": lazy(() => import("~/components/blocks/info/Info.vue")),
	"block.story-split": lazy(() => import("~/components/blocks/storySplit/StorySplit.vue")),
	"block.featured": lazy(() => import("~/components/blocks/featured/Featured.vue")),
};
</script>

<template>
	<component
		v-for="block in blocks"
		:key="`${block.__component}-${block.id}`"
		:is="map[block.__component]"
		:block="block" />
</template>
