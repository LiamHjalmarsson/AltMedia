<script setup lang="ts">
import type { Hero } from "~/types/content/blocks";

const { block } = defineProps<{ block: Hero }>();

const img = useImage();

const backgroundStyle = computed(() => {
	if (!block.cover?.length || !block.cover[0]?.url) {
		return {};
	}

	const src = block.cover[0].url;

	const optimized = img(src, {
		format: "webp",
		quality: 50,
		width: 1800,
	});

	return {
		backgroundImage: `linear-gradient(to bottom right, rgba(10,10,25,0.85), rgba(10,10,25,0.7)), url('${optimized}')`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
	};
});

const textAlign = computed(() => {
	switch (block.align_content) {
		case "center":
			return "items-center text-center";
		case "right":
			return "items-end text-right";
		default:
			return "items-start text-left";
	}
});

function formatColoredWords(block: Hero): string {
	let title = block.title;

	if (block.colored_words) {
		Object.entries(block.colored_words).forEach(([word, color]) => {
			const regex = new RegExp(`\\b${word}\\b`, "gi");

			title = title.replace(regex, `<span style="color:${color}">${word}</span>`);
		});
	}
	return title;
}
</script>

<template>
	<section
		class="hero bg-dark text-light overflow-hidden relative min-h-screen flex justify-center items-center"
		:style="backgroundStyle">
		<div class="absolute inset-0 z-0" />

		<div class="flex items-center relative z-10 p-sm xs:p-md md:p-lg lg:p-2xl">
			<div
				class="flex w-full items-center"
				:class="[!block.has_form ? textAlign : '', block.has_form ? 'gap-2xl max-xl:flex-col' : '']">
				<div
					class="flex flex-col space-y-xl max-w-4xl"
					:class="[
						!block.has_form ? textAlign : '',
						block.has_form ? 'xl:pr-2xl max-xl:items-center max-xl:text-center' : '',
					]">
					<h1
						class="text-heading-xl md:text-heading-2xl lg:text-heading-3xl font-bold leading-tight tracking-tight"
						v-html="formatColoredWords(block)"></h1>

					<p
						v-if="block.description"
						class="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl max-sm:text-center">
						{{ block.description }}
					</p>

					<div v-if="block.links?.length" class="flex flex-wrap gap-md justify-center md:justify-start">
						<ButtonLink
							v-for="link in block.links"
							:key="link.id"
							:variant="link.variant"
							:to="link.url"
							:size="link.size || 'lg'">
							{{ link.label }}
						</ButtonLink>
					</div>
				</div>
			</div>

			<slot v-if="block.has_form" />
		</div>
	</section>
</template>
