<script setup lang="ts">
import type { Hero } from "~/types";

const { content } = defineProps<{ hasForm: boolean; content: Hero }>();

function formatColoredWords(content: Hero): string {
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
		class="flex flex-col space-y-lg lg:space-y-xl"
		:class="hasForm ? 'xl:pr-2xl max-lg:items-center max-lg:text-center' : ''">
		<h1
			class="text-heading-4xl md:text-heading-5xl xl:text-heading-6xl font-extrabold"
			v-html="formatColoredWords(content)" />

		<p v-if="content.description" class="text-lg md:text-xl lg:text-heading-md max-w-[1050px]">
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
