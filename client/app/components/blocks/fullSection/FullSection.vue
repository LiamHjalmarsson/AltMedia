<script setup lang="ts">
import type { BlockFullSectionComponent } from "~/types/components/block/fullSection";
import type { StylesColorComponent } from "~/types/components/styles/color";
import { themeClasses } from "~/utils/theme";

const props = defineProps<{ block: BlockFullSectionComponent }>();

const theme = computed(() => themeClasses(props.block.color as StylesColorComponent));
</script>

<template>
	<section
		class="relative w-full min-h-[70vh] px-md md:px-lg py-2xl lg:p-2xl flex items-center justify-center overflow-hidden max-lg:h-screen"
		:class="[theme.sectionClassName, theme.contentTextClass]"
		:style="theme.sectionStyle">
		<CoverBackground :media="block.cover" class="absolute inset-0 opacity-30" />

		<div class="relative z-10 text-center mx-auto max-w-screen-md lg:max-w-screen-lg">
			<h2
				v-if="block.title"
				class="text-heading-xl md:text-heading-2xl lg:text-heading-3xl xl:text-heading-4xl font-bold mb-xl">
				{{ block.title }}
			</h2>
			<div class="space-y-md">
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
