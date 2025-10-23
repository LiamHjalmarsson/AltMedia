<script setup lang="ts">
import type { BlockNode } from "#strapi-blocks-renderer/types";
import type { InfoBlock } from "~/types/content/blocks";

const { block } = defineProps<{
	block: InfoBlock;
}>();

const content: BlockNode[] = block.content || [];
</script>

<template>
	<section class="relative w-full flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl">
		<div class="mx-auto w-full h-full max-w-[1600px] px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl">
			<div :class="['grid items-center gap-xl', block.image?.url ? 'md:grid-cols-2' : 'md:grid-cols-1']">
				<div v-if="block.image?.url" :class="block.reverse ? 'md:order-2' : 'md:order-1'">
					<NuxtImg
						:src="block.image.url"
						:alt="block.image.alternativeText || ''"
						format="webp"
						quality="85"
						placeholder
						loading="lazy"
						sizes="100vw sm:50vw md:600px"
						densities="x1 x2"
						class="w-full h-auto rounded-xl object-cover" />
				</div>

				<div
					:class="[
						block.image?.url ? (block.reverse ? 'md:order-1' : 'md:order-2') : '',
						!block.image?.url
							? block.align_content === 'center'
								? 'text-center'
								: block.align_content === 'right'
									? 'text-right'
									: 'text-left'
							: '',
					]">
					<StrapiBlocksText
						v-if="content?.length"
						:nodes="content"
						class="mb-lg leading-relaxed text-base md:text-lg" />
				</div>
			</div>
		</div>
	</section>
</template>
