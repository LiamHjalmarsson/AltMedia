<script setup lang="ts">
import type { Hero } from "~/types/content/blocks";

const { content } = defineProps<{ content: Hero }>();

function formatColoredWords(content: Hero): string {
	let title = content.title;

	if (content.colored_words) {
		for (const [word, color] of Object.entries(content.colored_words)) {
			const regex = new RegExp(`\\b${word}\\b`, "gi");

			title = title.replace(regex, `<span style='color:${color}'>${word}</span>`);
		}
	}
	return title;
}
</script>

<template>
	<div
		class="flex flex-col space-y-xl max-w-4xl"
		:class="content.has_form ? 'xl:pr-2xl max-xl:items-center max-xl:text-center' : ''">
		<h1
			class="text-heading-xl md:text-heading-2xl lg:text-heading-3xl xl:text-heading-4xl font-extrabold leading-tight tracking-tight"
			v-html="formatColoredWords(content)" />
		<p v-if="content.description" class="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl max-sm:text-center">
			{{ content.description }}
		</p>
		<div v-if="content.links?.length" class="flex flex-wrap gap-md justify-center md:justify-start">
			<ButtonLink
				v-for="link in content.links"
				:key="link.id"
				:variant="link.variant"
				:to="link.url"
				:size="link.size || 'lg'">
				{{ link.label }}
			</ButtonLink>
		</div>
	</div>
</template>
