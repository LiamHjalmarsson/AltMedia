<script setup lang="ts">
import type { Hero } from "~/types/content/blocks";
import HeroContent from "./HeroContent.vue";

const { block } = defineProps<{ block: Hero }>();

const img = useImage();

const backgroundStyle = computed(() => {
	if (!block.cover?.length || !block.cover[0]?.url) {
		return {};
	}

	const src = block.cover[0].url;

	const optimized = img(src, {
		format: "webp",
		quality: 65,
		width: 1800,
	});

	return {
		backgroundImage: `linear-gradient(to bottom right, rgba(10,10,25,0.85), rgba(10,10,25,0.7)), url('${optimized}')`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
	};
});

const alignClass = computed(() => {
	if (block.has_form) {
		return "gap-2xl max-xl:flex-col";
	} else {
		switch (block.align_content) {
			case "center":
				return "items-center text-center";
			case "right":
				return "items-end text-right";
			default:
				return "items-start text-left";
		}
	}
});
</script>

<template>
	<section
		class="hero bg-dark text-light overflow-hidden relative flex justify-center items-center px-xl py-4xl lg:px-lg xl:px-xl lg:py-5xl max-lg:h-screen"
		:style="backgroundStyle">
		<div class="absolute inset-0 pointer-events-none">
			<div class="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
			<div
				class="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-primary-hover/20 blur-3xl" />
		</div>

		<div class="flex lg:space-x-xl items-center relative z-10 lg:px-lg lg:py-2xl xl:p-2xl lg:max-w-[1600px]">
			<div class="flex w-full items-center flex-1" :class="alignClass">
				<HeroContent :content="block" />
			</div>

			<slot v-if="block.has_form" />
		</div>
	</section>
</template>
