<script setup lang="ts">
import type { BlockNode } from "#strapi-blocks-renderer/types";

defineProps<{
	title: string;
	anchor: string;
	content: BlockNode[];
}>();
</script>

<template>
	<section :id="anchor" class="scroll-mt-6xl">
		<h3 class="font-semibold text-heading-md sm:text-heading-lg mb-sm">
			{{ title }}
		</h3>
		<div class="space-y-lg" v-if="content?.length">
			<StrapiBlocksText :nodes="content" />
		</div>
	</section>
</template>
