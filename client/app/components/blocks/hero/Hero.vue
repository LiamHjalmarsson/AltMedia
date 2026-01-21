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

const bgColor = computed(() => {
	if (!block.color) {
		return "bg-bg-dark";
	}

	console.log(block.color);

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

const colorTheme = computed(() => {
	if (!block.color) return "text-dark";

	if (block.color.theme === "light") return "text-dark";

	if (block.color.theme === "dark") return "text-white";

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
		<div :class="!block.color?.hex ? bgColor : ''" :style="block.color?.hex ? bgColor : ''">
			<HeroBackground v-if="!block.background" />
			<CoverBackground v-else :media="block.background" />
		</div>

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
