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

const colorTheme = computed(() => {
	// IMPORTANT: default should match HeroBackground (light)
	if (!block.color) return "bg-white text-dark";

	if (block.color.theme === "light") return "bg-white text-dark";
	if (block.color.theme === "dark") return "bg-dark text-white";

	if (block.color.hex) {
		return { backgroundColor: block.color.hex };
	}
});
</script>

<template>
	<section
		class="hero overflow-hidden relative flex justify-center items-center px-xl py-4xl lg:px-lg xl:px-xl lg:py-5xl min-h-[80vh] max-lg:h-screen"
		:class="[colorTheme]"
		:style="block.color?.hex ? colorTheme : ''"
		:data-header-theme="!block.background ? 'light' : undefined">
		<HeroBackground v-if="!block.background" />
		<CoverBackground v-else :media="block.background" class="opacity-60" />

		<div class="pt-xl relative z-10">
			<div class="flex lg:space-x-xl items-center relative z-10 lg:px-lg lg:py-2xl xl:p-2xl lg:max-w-[1600px]">
				<div class="flex w-full items-center flex-1" :class="alignClass">
					<HeroContent :content="block" :hasForm />
				</div>

				<slot />
			</div>
		</div>
	</section>
</template>
