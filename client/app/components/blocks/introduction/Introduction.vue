<script setup lang="ts">
import type { StrapiBlocksContent } from "~/types/blocks";
import type { UiHeadingComponent } from "~/types/components/ui/heading";

defineProps<{
	heading: UiHeadingComponent;
	content: StrapiBlocksContent;
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
