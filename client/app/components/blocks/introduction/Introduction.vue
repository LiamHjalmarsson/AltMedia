<script setup lang="ts">
import type { Heading } from "~/types";
import type { BlockNode } from "#strapi-blocks-renderer/types";

defineProps<{
	heading: Heading;
	content: BlockNode[];
}>();
</script>

<template>
	<header class="">
		<Heading v-bind="heading" class="mb-md lg:mb-lg" tag="h2" />

		<div class="space-y-md" v-if="content?.length">
			<StrapiBlocksText :nodes="content" />
		</div>
	</header>
</template>
