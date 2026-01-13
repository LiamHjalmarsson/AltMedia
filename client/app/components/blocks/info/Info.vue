<script setup lang="ts">
import type { BlockNode } from "#strapi-blocks-renderer/types";
import type { InfoBlock } from "~/types/content/blocks";

const { block } = defineProps<{
	block: InfoBlock;
}>();

const content: BlockNode[] = block.content || [];

const hasImage = computed(() => !!block.image?.url);

const textAlignClass = computed(() => {
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
</script>

<template>
	<section class="relative py-3xl lg:py-5xl">
		<div class="mx-auto max-w-[1300px] px-xl lg:px-3xl">
			<div :class="['grid items-center gap-xl', hasImage ? 'md:grid-cols-2' : 'md:grid-cols-1']">
				<div v-if="hasImage" :class="block.reverse ? 'md:order-2' : 'md:order-1'">
					<NuxtImg
						:src="block.image?.url"
						:alt="block.image?.alternativeText || ''"
						format="webp,avif"
						quality="85"
						placeholder
						loading="lazy"
						sizes="100vw sm:50vw md:600px"
						densities="x1 x2"
						class="w-full h-auto rounded-xl object-cover" />
				</div>

				<div :class="[hasImage ? (block.reverse ? 'md:order-1' : 'md:order-2') : '', textAlignClass]">
					<StrapiBlocksText v-if="content?.length" :nodes="content" class="mb-lg" />
				</div>
			</div>
		</div>
	</section>
</template>
