<script setup lang="ts">
import type { Hero } from "~/types";

const { block, hasForm } = defineProps<{ hasForm?: boolean; block: Hero }>();

const alignClass = computed(() => {
	if (hasForm) {
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
		class="hero bg-dark text-light overflow-hidden relative flex justify-center items-center px-xl py-4xl lg:px-lg xl:px-xl lg:py-5xl min-h-[90vh] max-lg:h-screen"
		style="min-height: 90vh">
		<NuxtImg
			v-if="block.background?.url"
			:src="block.background.url"
			:alt="block.title"
			format="webp,avif"
			width="1800"
			height="1000"
			quality="65"
			fetchpriority="high"
			preload
			decoding="sync"
			class="absolute inset-0 w-full h-full object-cover opacity-45" />

		<div class="pt-xl relative z-10">
			<div class="flex lg:space-x-xl items-center relative z-10 lg:px-lg lg:py-2xl xl:p-2xl lg:max-w-[1500px]">
				<div class="flex w-full items-center flex-1" :class="alignClass">
					<HeroContent :content="block" :hasForm />
				</div>

				<slot />
			</div>
		</div>
	</section>
</template>
