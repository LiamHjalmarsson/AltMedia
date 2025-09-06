<script setup lang="ts">
import { computed } from "vue";
import type { FullSectionBlock } from "~/types/blocks/fullSection";

const props = defineProps<{ block: FullSectionBlock }>();

const bgColor = computed(() => {
	if (!props.block.color) {
		return "bg-bg-dark";
	}

	if (props.block.color.is_hex && props.block.color.hex) {
		return { backgroundColor: props.block.color.hex };
	}

	switch (props.block.color.type) {
		case "primary":
			return "bg-primary";
		case "secondary":
			return "bg-secondary";
		default:
			return "bg-bg-dark";
	}
});

const textColor = computed(() => {
	if (!props.block.color) {
		return "text-light";
	}

	return props.block.color.is_dark_text ? "text-dark" : "text-light";
});
</script>

<template>
	<Section
		class="h-screen bg-cover bg-center relative"
		:class="!block.color?.is_hex ? bgColor : ''"
		:style="block.color?.is_hex ? bgColor : ''">
		<NuxtImg
			v-if="block.cover"
			:src="block.cover.url"
			alt=""
			aria-hidden="true"
			class="absolute inset-0 h-full w-full object-cover opacity-10" />

		<div class="text-light relative z-10 max-w-screen-md lg:max-w-screen-lg text-center mx-auto py-xxl px-md">
			<h3
				v-if="block.title"
				class="text-heading-lg sm:text-heading-xl md:text-heading-xxl lg:text-heading-xxxl xl:text-heading-xxxxl font-bold font-heading text-secondary mb-xs">
				{{ block.title }}
			</h3>

			<StrapiBlocksText
				v-if="block.content?.length"
				:nodes="block.content || []"
				:class="textColor"
				class="text-lg lg:text-xl font-medium leading-relaxed" />
		</div>

		<div v-if="block.link" class="absolute bottom-0 right-0 p-xxl m-xxl">
			<NuxtLink
				:to="block.link.url"
				class="inline-block bg-primary text-white px-lg py-md rounded-lg font-semibold">
				{{ block.link.label || "Läs mer" }}
			</NuxtLink>
		</div>
	</Section>
</template>
