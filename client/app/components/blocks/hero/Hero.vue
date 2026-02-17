<script setup lang="ts">
import type { BlockHeroComponent } from "~/types/components/block/hero";

const props = defineProps<{
	hasForm?: boolean;
	block: BlockHeroComponent;
}>();

const splitLayout = computed<boolean>(() => Boolean(props.hasForm));

const contentAlignment = computed<string>(() => {
	if (splitLayout.value) {
		return "gap-2xl max-xl:flex-col";
	}

	switch (props.block.align_content) {
		case "center":
			return "items-center text-center";
		case "right":
			return "items-end text-right";
		default:
			return "items-start text-left";
	}
});

const theme = computed(() => themeClasses(props.block.color));

const headerTheme = computed<"light" | "dark">(() => (props.block.background ? "dark" : "light"));
</script>

<template>
	<section class="min-h-screen lg:px-xl lg:pb-xl lg:pt-5xl flex">
		<div
			class="hero flex-1 overflow-hidden relative flex justify-center items-center px-sm md:px-lg lg:px-xl py-4xl lg:py-xl lg:rounded-4xl"
			:class="theme.sectionClassName"
			:style="theme.sectionStyle"
			:data-header-theme="headerTheme">
			<div v-if="block.background" class="absolute inset-0 w-full h-full opacity-40">
				<CoverBackground :media="block.background" />
			</div>

			<div class="pt-xl relative z-10" :class="theme.contentTextClass">
				<div
					class="flex lg:space-x-xl items-center relative z-10 lg:px-lg lg:py-2xl xl:p-2xl xl:max-w-[1800px]">
					<div class="flex w-full items-center flex-1" :class="contentAlignment">
						<HeroContent :content="block" :split-layout="splitLayout" />
					</div>

					<slot />
				</div>
			</div>
		</div>
	</section>
</template>
