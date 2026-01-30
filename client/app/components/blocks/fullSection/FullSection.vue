<script setup lang="ts">
import type { FullSectionBlock } from "~/types";
import { themeClasses } from "~/utils/theme";

const props = defineProps<{ block: FullSectionBlock }>();

const theme = computed(() => themeClasses(props.block.color));
</script>

<template>
	<section
		class="relative w-full min-h-[70vh] px-lg py-2xl lg:p-2xl flex items-center justify-center overflow-hidden max-lg:h-screen"
		:class="[theme.sectionClassName, theme.contentTextClass]"
		:style="theme.sectionStyle">
		<CoverBackground :media="block.cover" class="absolute inset-0 opacity-30" />

		<div class="relative z-10 text-center mx-auto max-w-screen-md lg:max-w-screen-lg">
			<h2 v-if="block.title" class="text-heading-lg md:text-heading-xl lg:text-heading-2xl font-bold mb-xl">
				{{ block.title }}
			</h2>
			<div class="space-y-lg">
				<StrapiBlocksText v-if="block.content?.length" :nodes="block.content" />
			</div>
		</div>

		<div v-if="block.link" class="absolute bottom-0 right-0 p-2xl mt-2xl">
			<ButtonLink
				:label="block.link.label"
				:to="block.link.url"
				:variant="block.link.variant"
				:size="block.link.size || 'md'"
				:icon="block.link.icon" />
		</div>
	</section>
</template>
