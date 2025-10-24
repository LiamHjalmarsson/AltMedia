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
		class="hero bg-dark text-light overflow-hidden relative min-h-screen flex justify-center items-center"
		:style="backgroundStyle">
		<div
			class="flex max-xl:flex-col max-xl:space-y-2xl max-xl:p-2xl items-center relative z-10 p-sm xs:p-md md:p-lg lg:p-2xl">
			<div class="flex w-full items-center flex-1" :class="alignClass">
				<HeroContent :content="block" />
			</div>

			<slot v-if="block.has_form" />
		</div>
	</section>
</template>
