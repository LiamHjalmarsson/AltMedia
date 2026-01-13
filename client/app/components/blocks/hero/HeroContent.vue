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
		<span
			v-if="content.badge"
			class="inline-flex items-center border border-secondary/30 bg-secondary/20 px-md py-sm text-xs font-semibold uppercase tracking-widest text-secondary w-fit">
			{{ content.badge }}
		</span>

		<h1
			class="text-heading-2xl md:text-heading-3xl xl:text-heading-4xl font-extrabold tracking-tighter"
			v-html="formatColoredWords(content)" />

		<p v-if="content.description" class="text-lg md:text-xl lg:text-heading-md text-white tracking-tighter">
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
