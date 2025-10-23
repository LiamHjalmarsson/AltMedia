<script setup lang="ts">
import { computed } from "vue";
import type { FullSectionBlock } from "~/types/content/blocks";

const { block } = defineProps<{ block: FullSectionBlock }>();

const bgColor = computed(() => {
	if (!block.color) {
		return "bg-bg-dark text-light";
	}

	if (block.color.is_hex && block.color.hex) {
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
	if (!block.color) {
		return "text-light";
	}

	return block.color.is_dark_text ? "text-dark" : "text-light";
});
</script>

<template>
	<section
		class="relative w-full h-screen flex items-center justify-center overflow-hidden"
		:class="!block.color?.is_hex ? bgColor : ''"
		:style="block.color?.is_hex ? bgColor : ''">
		<NuxtImg
			v-if="block.cover"
			:src="block.cover.url"
			:alt="block.cover.alternativeText || ''"
			format="webp"
			quality="80"
			loading="lazy"
			class="object-cover opacity-10 absolute inset-0 h-full w-full" />

		<div class="relative z-10 text-center mx-auto py-2xl px-md max-w-screen-md lg:max-w-screen-lg">
			<h3
				v-if="block.title"
				class="text-heading-lg sm:text-heading-xl md:text-heading-2xl lg:text-heading-3xl xl:text-heading-4xl font-bold text-secondary mb-xs">
				{{ block.title }}
			</h3>

			<ClientOnly>
				<StrapiBlocksText
					v-if="block.content?.length"
					:nodes="block.content || []"
					:class="textColor"
					class="text-lg lg:text-xl font-medium leading-relaxed" />
			</ClientOnly>
		</div>

		<div v-if="block.link" class="absolute bottom-0 right-0 p-2xl m-2xl">
			<NuxtLink
				:to="block.link.url"
				class="inline-block bg-primary text-white px-lg py-md rounded-lg font-semibold">
				{{ block.link.label || "Läs mer" }}
			</NuxtLink>
		</div>
	</section>
</template>
