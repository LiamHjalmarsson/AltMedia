<script setup lang="ts">
import type { List } from "~/types/content/blocks";

defineProps<{ block: List }>();
</script>

<template>
	<Section class="bg-bg-dark text-light">
		<Container>
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" />

			<Grid class="md:grid-cols-1">
				<div
					v-for="(item, i) in block.items"
					:key="item.id"
					class="grid grid-cols-2 gap-xxl items-center w-full group overflow-hidden">
					<div :class="(i + 1) % 2 === 0 ? 'md:order-2 pl-xxl' : 'md:order-1 pr-xxl'">
						<div class="flex items-center">
							<span
								class="text-heading-lg sm:text-heading-xl md:text-heading-xxl lg:text-heading-xxxl xl:text-heading-xxxxl font-extrabold text-secondary mr-md lg:mr-lg font-heading">
								{{ i + 1 }}
							</span>
							<h3
								class="text-heading-sm md:text-heading-md lg:text-heading-lg xl:text-heading-xl font-semibold first-letter:capitalize truncate">
								{{ item.title }}
							</h3>
						</div>

						<StrapiBlocksText v-if="item.content?.length" :nodes="item.content || []" class="text-lg" />
					</div>

					<div
						:class="(i + 1) % 2 === 0 ? 'md:order-1 pr-xxl' : 'md:order-2 pl-xxl'"
						class="overflow-hidden rounded-2xl">
						<NuxtImg
							v-if="item.icon && item.icon.is_image"
							:src="item.icon.image?.url"
							:alt="item.icon.image?.alternativeText || ''"
							class="w-full rounded-xl object-cover max-h-[550px]" />
					</div>
				</div>
			</Grid>
		</Container>
	</Section>
</template>
