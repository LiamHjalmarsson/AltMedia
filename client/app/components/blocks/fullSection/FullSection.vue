<script setup lang="ts">
import type { FullSectionBlock } from "~/types";
import { themeClasses } from "~/utils/theme";

const props = defineProps<{ block: FullSectionBlock }>();

const theme = computed(() => themeClasses(props.block.color));
</script>

<template>
	<section
		class="relative w-full min-h-[70vh] py-2xl lg:p-2xl flex items-center justify-center overflow-hidden"
		:class="[theme.sectionClassName, theme.contentTextClass]"
		:style="theme.sectionStyle">
		<CoverBackground :media="block.cover" class="absolute inset-0 opacity-30" />

		<div class="relative z-10 text-center mx-auto max-w-screen-md lg:max-w-screen-lg px-lg">
			<h2 v-if="block.title" class="text-heading-lg md:text-heading-xl lg:text-heading-2xl font-bold mb-xl">
				{{ block.title }}
			</h2>
			<StrapiBlocksText v-if="block.content?.length" :nodes="block.content" />
		</div>

		<div v-if="block.link" class="absolute bottom-0 right-0 p-2xl m-2xl">
			<ButtonLink
				:label="block.link.label"
				:to="block.link.url"
				:variant="block.link.variant"
				:size="block.link.size || 'md'"
				:icon="block.link.icon" />
		</div>
	</section>
</template>
