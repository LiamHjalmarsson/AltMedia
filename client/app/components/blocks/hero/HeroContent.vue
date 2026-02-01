<script setup lang="ts">
import type { BlockHeroComponent } from "~/types/components/block/hero";

const { content } = defineProps<{ splitLayout: boolean; content: BlockHeroComponent }>();

function formatColoredWords(content: BlockHeroComponent): string {
	let title = content.title;

	if (!content.colored_words) return title;

	for (const [word, color] of Object.entries(content.colored_words)) {
		const regex = new RegExp(`\\b${word}\\b`, "gi");

		title = title.replace(regex, `<span style='color:${color}'>${word}</span>`);
	}

	return title;
}
</script>

<template>
	<div
		class="flex flex-col space-y-xl lg:space-y-lg xl:space-y-2xl"
		:class="splitLayout ? 'xl:pr-2xl max-lg:items-center max-lg:text-center' : ''">
		<h1
			class="text-heading-2xl sm:text-heading-2xl md:text-heading-3xl lg:text-heading-3xl 2xl:text-heading-4xl 3xl:text-heading-6xl font-extrabold"
			v-html="formatColoredWords(content)" />

		<p v-if="content.description" class="text-xl lg:text-heading-sm xl:text-heading-md max-w-[1050px]">
			{{ content.description }}
		</p>

		<div v-if="content.links?.length" class="flex justify-center md:justify-start">
			<ButtonLink
				v-for="link in content.links"
				:key="link.id"
				:variant="link.variant"
				:url="link.url"
				:size="link.size || 'md'"
				:label="link.label" />
		</div>
	</div>
</template>
