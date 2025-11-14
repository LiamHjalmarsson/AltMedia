<script setup lang="ts">
import type { Hero } from "~/types";

const { content } = defineProps<{ hasForm: boolean; content: Hero }>();

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
		class="flex flex-col space-y-lg lg:space-y-xl"
		:class="hasForm ? 'xl:pr-2xl max-lg:items-center max-lg:text-center' : ''">
		<span
			v-if="content.badge"
			class="inline-flex items-center border-2 border-primary/30 bg-primary/20 px-md py-sm text-sm font-semibold uppercase tracking-widest text-primary w-fit">
			{{ content.badge }}
		</span>

		<h1
			class="text-heading-xl md:text-heading-2xl xl:text-heading-3xl font-extrabold leading-tight tracking-tight"
			v-html="formatColoredWords(content)" />
		<p v-if="content.description" class="text-lg md:text-xl lg:text-2xl text-white">
			{{ content.description }}
		</p>

		<div v-if="content.links?.length" class="flex justify-center md:justify-start">
			<ButtonLink
				v-for="link in content.links"
				:key="link.id"
				:variant="link.variant"
				:url="link.url"
				:size="link.size || 'xl'"
				:label="link.label"
				class="max-lg:min-w-[250px]" />
		</div>
	</div>
</template>
