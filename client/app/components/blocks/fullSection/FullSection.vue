<script setup lang="ts">
import { computed } from "vue";
import type { FullSectionBlock } from "~/types/content/blocks";

const { block } = defineProps<{ block: FullSectionBlock }>();

const bgColor = computed(() => {
	if (!block.color) {
		return "bg-bg-dark text-light";
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
	return block.color?.theme === "dark" ? "text-dark" : "text-light";
});
</script>

<template>
	<section
		class="relative w-full min-h-[70vh] p-2xl flex items-center justify-center overflow-hidden"
		:class="!block.color?.hex ? bgColor : ''"
		:style="block.color?.hex ? bgColor : ''">
		<NuxtImg
			v-if="block.cover"
			:src="block.cover.url"
			:alt="block.cover.alternativeText || ''"
			format="webp,avif"
			quality="80"
			sizes="100vw"
			densities="x1 x2"
			loading="lazy"
			class="absolute inset-0 object-cover opacity-30 h-full w-full" />

		<div class="relative z-10 text-center mx-auto max-w-screen-md lg:max-w-screen-lg" :class="textColor">
			<h2
				v-if="block.title"
				class="text-heading-xl md:text-heading-2xl lg:text-heading-3xl xl:text-heading-4xl font-bold text-secondary">
				{{ block.title }}
			</h2>

			<ClientOnly>
				<StrapiBlocksText v-if="block.content?.length" :nodes="block.content || []" />
			</ClientOnly>
		</div>

		<div v-if="block.link" class="absolute bottom-0 right-0 p-2xl m-2xl">
			<ButtonLink
				:label="block.link.label"
				:url="block.link.url"
				:variant="block.link.variant"
				:icon="block.link.icon"
				:class="textColor" />
		</div>
	</section>
</template>
