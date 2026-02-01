<script setup lang="ts">
import type { StrapiBlocksContent } from "~/types/blocks";

defineProps<{
	title: string;
	anchor: string;
	content: StrapiBlocksContent;
}>();
</script>

<template>
	<section :id="anchor" class="scroll-mt-6xl">
		<h3 class="font-semibold text-heading-sm md:text-heading-md lg:text-heading-lg mb-sm md:mb-md">
			{{ title }}
		</h3>
		<div class="space-y-md" v-if="content?.length">
			<StrapiBlocksText :nodes="content" />
		</div>
	</section>
</template>
