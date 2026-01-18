<!-- components/blocks/info/Info.vue -->
<script setup lang="ts">
import type { BlockNode } from "#strapi-blocks-renderer/types";
import type { InfoBlock } from "~/types/content/blocks";

const { block } = defineProps<{ block: InfoBlock }>();

const content: BlockNode[] = block.content || [];

/**
 * Strapi schema: images = media (multiple: true)
 * Types in your snippet show images?: Image (singular) — handle both safely.
 */
const imgs = computed(() => {
	const maybe = (block as any).images;

	// Prefer images[] (new)
	if (Array.isArray(maybe) && maybe.length) return maybe;

	// Back-compat if you ever had image (single)
	const single = (block as any).image;
	if (single?.url) return [single];

	return [];
});

const hasImages = computed(() => imgs.value.length > 0);

const textAlignClass = computed(() => {
	// Only apply text alignment when there's no image column (same as your original)
	if (!hasImages.value) {
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

/** Optional: align text even when images exist (nice for center/right layouts) */
const contentAlignClass = computed(() => {
	switch (block.align_content) {
		case "center":
			return "items-center text-center";
		case "right":
			return "items-end text-right";
		default:
			return "items-start text-left";
	}
});

const gridColsClass = computed(() => (hasImages.value ? "md:grid-cols-2" : "md:grid-cols-1"));

const mediaOrderClass = computed(() => (block.reverse ? "md:order-2" : "md:order-1"));
const textOrderClass = computed(() => (block.reverse ? "md:order-1" : "md:order-2"));

const fadeOverlayClass = computed(() => {
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
			// soft edge all around
			return "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_40%,rgba(255,255,255,0.55)_70%,rgba(255,255,255,0.95)_100%)]";
		default:
			return "";
	}
});
</script>

<template>
	<section class="relative py-3xl lg:py-5xl">
		<div class="mx-auto max-w-[1300px] px-xl lg:px-3xl">
			<div :class="['grid items-center gap-xl', gridColsClass]">
				<div v-if="hasImages" :class="mediaOrderClass">
					<div v-if="!block.images_overlap || imgs.length === 1" class="relative">
						<NuxtImg
							:src="imgs[0].url"
							:alt="imgs[0].alternativeText || ''"
							format="webp,avif"
							quality="85"
							placeholder
							loading="lazy"
							sizes="100vw sm:50vw md:600px"
							densities="x1 x2"
							class="w-full h-auto rounded-2xl object-cover" />
						<div
							v-if="block.image_fade"
							:class="['pointer-events-none absolute inset-0 ', fadeOverlayClass]" />
					</div>

					<div v-else class="relative mx-auto w-full max-w-[560px]">
						<div class="relative z-0">
							<NuxtImg
								:src="imgs[0].url"
								:alt="imgs[0].alternativeText || ''"
								format="webp,avif"
								quality="85"
								placeholder
								loading="lazy"
								sizes="100vw sm:50vw md:560px"
								densities="x1 x2"
								class="w-full h-auto rounded-2xl object-cover shadow-xl" />
							<div
								v-if="block.image_fade"
								:class="['pointer-events-none absolute inset-0', fadeOverlayClass]" />
						</div>

						<div class="absolute z-10 -bottom-6 right-0 w-[78%] sm:w-[70%] md:w-[68%] lg:w-[62%]">
							<NuxtImg
								:src="imgs[1]?.url"
								:alt="imgs[1]?.alternativeText || ''"
								format="webp,avif"
								quality="85"
								placeholder
								loading="lazy"
								sizes="80vw sm:40vw md:420px"
								densities="x1 x2"
								class="w-full h-auto object-cover" />
							<div
								v-if="block.image_fade"
								:class="['pointer-events-none absolute inset-0 rounded-2xl', fadeOverlayClass]" />
						</div>

						<div class="h-10 sm:h-12 md:h-14" />
					</div>
				</div>

				<div
					:class="[
						hasImages ? textOrderClass : '',
						textAlignClass,
						hasImages ? contentAlignClass : '',
						'space-y-xl',
					]">
					<StrapiBlocksText v-if="content?.length" :nodes="content" class="mb-lg" />
				</div>
			</div>
		</div>
	</section>
</template>
