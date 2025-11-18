<script setup lang="ts">
import type { FullSectionBlock } from "~/types";

const { block } = defineProps<{ block: FullSectionBlock }>();

const bgColor = computed(() => {
	if (!block.color) {
		return "bg-bg-dark text-white";
	}

	if (block.color.hex) {
		return { backgroundColor: block.color.hex };
	}

	switch (block.color.type) {
		case "primary":
			return "bg-primary";
		case "secondary":
			return "bg-secondary";
		default:
			return "bg-bg-dark";
	}
});

const textColor = computed(() => {
	return block.color?.theme === "dark" ? "text-black" : "text-white";
});
</script>

<template>
	<section
		class="relative w-full min-h-[70vh] py-2xl lg:p-2xl flex items-center justify-center overflow-hidden"
		:class="!block.color?.hex ? bgColor : ''"
		:style="block.color?.hex ? bgColor : ''">
		<CoverBackground
			:media="block.cover"
			overlay="bg-bg-dark/30"
			class="absolute inset-0 object-cover opacity-30 h-full w-full" />

		<div class="relative z-10 text-center mx-auto max-w-screen-md lg:max-w-screen-lg px-lg" :class="textColor">
			<h2
				v-if="block.title"
				class="text-heading-lg md:text-heading-xl lg:text-heading-2xl xl:text-heading-3xl font-bold text-secondary mb-lg">
				{{ block.title }}
			</h2>

			<!-- <ClientOnly> -->
			<StrapiBlocksText v-if="block.content?.length" :nodes="block.content || []" />
			<!-- </ClientOnly> -->
		</div>

		<div v-if="block.link" class="absolute bottom-0 right-0 p-2xl m-2xl">
			<ButtonLink
				:label="block.link.label"
				:url="block.link.url"
				:variant="block.link.variant"
				:size="block.link.size || 'md'"
				:icon="block.link.icon"
				:class="textColor" />
		</div>
	</section>
</template>
