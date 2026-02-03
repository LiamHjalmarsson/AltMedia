<!-- components/blocks/info/Info.vue -->
<script setup lang="ts">
import type { StrapiBlocksContent } from "~/types/blocks";
import type { BlockInfoComponent } from "~/types/components/block/info";

const { block } = defineProps<{ block: BlockInfoComponent }>();

const content: StrapiBlocksContent = block.content || [];

const hasImage = computed(() => Boolean(block.image?.url));

const mediaColOrder = computed(() => (block.reverse ? "md:order-2" : "md:order-1"));

const textColOrder = computed(() => (block.reverse ? "md:order-1" : "md:order-2"));

const textAlign = computed(() => {
	if (!hasImage.value) {
		switch (block.align_content) {
			case "center":
				return "text-center";
			case "right":
				return "text-right";
			default:
				return "text-left";
		}
	}
	return "";
});

const contentAlign = computed(() => {
	switch (block.align_content) {
		case "center":
			return "items-center text-center";
		case "right":
			return "items-end text-right";
		default:
			return "items-start text-left";
	}
});

const imageFadeOverlayClass = computed(() => {
	switch (block.image_fade) {
		case "top":
			return "bg-gradient-to-b from-white/95 via-white/40 to-transparent";
		case "bottom":
			return "bg-gradient-to-t from-white/95 via-white/40 to-transparent";
		case "left":
			return "bg-gradient-to-r from-white/95 via-white/40 to-transparent";
		case "right":
			return "bg-gradient-to-l from-white/95 via-white/40 to-transparent";
		case "all":
			return "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_40%,rgba(255,255,255,0.55)_70%,rgba(255,255,255,0.95)_100%)]";
		default:
			return "";
	}
});
</script>

<template>
	<section class="relative py-2xl md:py-3xl lg:py-5xl">
		<div class="mx-auto max-w-[1300px] px-xl lg:px-3xl">
			<div class="flex max-sm:flex-col-reverse flex-col gap-lg lg:gap-3xl md:flex-row md:items-stretch">
				<div v-if="hasImage" :class="mediaColOrder" class="relative w-full md:w-1/2 md:flex-1">
					<div class="relative h-full max-h-52 lg:min-h-[340px] overflow-hidden lg:scale-y-110">
						<NuxtImg
							:src="block.image!.url"
							:alt="block.image!.alternativeText || ''"
							format="webp,avif"
							quality="85"
							placeholder
							loading="lazy"
							sizes="100vw sm:50vw md:600px"
							densities="x1 x2"
							class="h-full w-full object-cover" />

						<div
							v-if="block.image_fade"
							:class="['pointer-events-none absolute inset-0', imageFadeOverlayClass]" />
					</div>
				</div>

				<div
					:class="[
						hasImage ? textColOrder : '',
						textAlign,
						hasImage ? contentAlign : '',
						'flex flex-col w-full md:w-1/2 md:flex-1 justify-center md:space-y-sm lg:space-y-md',
					]">
					<StrapiBlocksText v-if="content?.length" :nodes="content" />
				</div>
			</div>
		</div>
	</section>
</template>
