<script setup lang="ts">
import type { ListBlock } from "~/types/content/blocks";

defineProps<{ block: ListBlock }>();
</script>

<template>
	<Section class="bg-bg-dark text-light">
		<Container>
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" />

			<div class="flex flex-col gap-2xl">
				<div
					v-for="(item, i) in block.items"
					:key="item.id"
					class="group grid lg:grid-cols-2 items-center gap-2xl">
					<div
						:class="[
							'overflow-hidden rounded-2xl relative hidden lg:block transition-transform duration-500 ease-out',
							(i + 1) % 2 === 0 ? 'order-2' : 'order-1',
						]">
						<NuxtImg
							v-if="item.icon?.is_image"
							:src="item.icon.image?.url"
							:alt="item.icon.image?.alternativeText || ''"
							class="w-full h-full object-cover max-h-[520px] rounded-2xl scale-[1.02] group-hover:scale-100 transition-transform duration-700 ease-out" />
					</div>

					<div
						:class="[
							'flex flex-col justify-center relative',
							(i + 1) % 2 === 0 ? 'lg:order-1 lg:pr-2xl' : 'lg:order-2 lg:pl-2xl',
							'max-lg:bg-light/5 max-lg:rounded-2xl max-lg:shadow-2xl max-lg:overflow-hidden max-lg:backdrop-blur-md',
						]">
						<div class="relative lg:hidden">
							<NuxtImg
								v-if="item.icon?.is_image"
								:src="item.icon.image?.url"
								:alt="item.icon.image?.alternativeText || ''"
								class="w-full h-64 sm:h-80 object-cover" />

							<div class="absolute inset-0 bg-gradient-to-t from-bg-dark/60 to-transparent" />
						</div>

						<div class="p-xl sm:p-2xl text-center lg:text-left space-y-md">
							<div
								class="flex items-center gap-md justify-center lg:justify-start max-lg:flex-col max-lg:gap-xs">
								<span
									class="text-heading-lg sm:text-heading-xl md:text-heading-2xl lg:text-heading-3xl xl:text-heading-4xl font-extrabold text-secondary font-heading">
									{{ (i + 1).toString().padStart(2, "0") }}
								</span>

								<h3
									class="text-heading-sm md:text-heading-md lg:text-heading-lg xl:text-heading-xl font-semibold capitalize leading-tight">
									{{ item.title }}
								</h3>
							</div>

							<StrapiBlocksText
								v-if="item.content?.length"
								:nodes="item.content || []"
								class="text-base sm:text-lg md:text-xl text-light/85 leading-relaxed max-lg:text-center" />
						</div>
					</div>
				</div>
			</div>
		</Container>
	</Section>
</template>
