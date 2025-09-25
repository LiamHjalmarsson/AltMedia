<script setup lang="ts">
import type { BlockNode } from "#strapi-blocks-renderer/types";
import type { InfoBlock } from "~/types/content/blocks";

const props = defineProps<{
	block: InfoBlock;
}>();

const content: BlockNode[] = props.block.content || [];
</script>

<template>
	<Section class="py-xxl">
		<Container>
			<Grid :class="['items-center gap-xl', block.image?.url ? 'md:grid-cols-2' : 'md:grid-cols-1']">
				<div v-if="block.image?.url" :class="block.reverse ? 'md:order-2' : 'md:order-1'">
					<NuxtImg
						:src="block.image.url"
						:alt="block.image.alternativeText || ''"
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
					<StrapiBlocksText v-if="content?.length" :nodes="content" class="mb-lg" />
				</div>
			</Grid>
		</Container>
	</Section>
</template>
