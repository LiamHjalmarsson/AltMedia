<script setup lang="ts">
import type { BlockHeroComponent } from "~/types/components/block/hero";

const { block, hasForm } = defineProps<{ hasForm?: boolean; block: BlockHeroComponent }>();

const splitLayout = computed(() => Boolean(hasForm));

const contentAlignment = computed(() => {
	if (splitLayout.value) {
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

const heroBackground = computed(() => {
	if (!block.color) {
		return "bg-bg-dark";
	}

	if (block.color.hex) {
		return { backgroundColor: block.color.hex };
	}

	switch (block.color.type) {
		case "primary":
			return "bg-primary";
		case "secondary":
			return "bg-secondary";
		default:
			return "bg-bg-dark";
	}
});

const headerTheme = computed<"light" | "dark">(() => {
	return block.background ? "dark" : "light";
});

const textColor = computed(() => {
	return block.color?.theme === "dark" ? "text-white placeholder-white/80" : "text-black placeholder-black/80";
});
</script>

<template>
	<section
		class="hero overflow-hidden relative flex justify-center items-center px-lg md:px-xl py-4xl lg:px-lg xl:px-3xl lg:py-6xl min-h-screen"
		:class="!block.color?.hex ? heroBackground : ''"
		:style="block.color?.hex ? heroBackground : ''"
		:data-header-theme="headerTheme">
		<div class="absolute inset-0 w-full h-full opacity-40">
			<CoverBackground :media="block.background" />
		</div>

		<div class="pt-xl relative z-10" :class="textColor">
			<div
				class="flex lg:space-x-xl items-center relative z-10 lg:px-lg lg:py-2xl xl:p-2xl lg:max-w-[1600px] xl:max-w-[1800px]">
				<div class="flex w-full items-center flex-1" :class="contentAlignment">
					<HeroContent :content="block" :splitLayout />
				</div>

				<slot />
			</div>
		</div>
	</section>
</template>
