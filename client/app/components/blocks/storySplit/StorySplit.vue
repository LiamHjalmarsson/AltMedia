<script setup lang="ts">
import type { BlockStorySplitComponent } from "~/types/components/block/storySplit";

const { block } = defineProps<{ block: BlockStorySplitComponent }>();

const primaryImage = computed(() => block.images?.[0] ?? null);

const secondaryImage = computed(() => block.images?.[1] ?? null);

const mediaOrder = computed(() => (block.reverse ? "lg:order-1" : "lg:order-2"));

const textOrder = computed(() => (block.reverse ? "lg:order-2" : "lg:order-1"));
</script>

<template>
	<section class="relative py-2xl md:py-3xl xl:py-5xl">
		<div class="mx-auto max-w-[1300px] px-sm md:px-lg xl:px-2xl">
			<div class="flex max-sm:flex-col items-center gap-lg">
				<div :class="['flex-1', textOrder]">
					<h2
						class="text-heading-lg md:text-heading-xl lg:text-heading-2xl xl:text-heading-3xl 2xl:text-heading-4xl font-semibold">
						{{ block.title }}
					</h2>

					<div class="mt-md lg:mt-lg space-y-md">
						<StrapiBlocksText v-if="block.content?.length" :nodes="block.content" />
					</div>
				</div>

				<div :class="['flex-1', mediaOrder]">
					<div class="relative mx-auto w-full lg:min-w-[250px] max-w-[420px]">
						<div class="relative z-10 ml-auto w-[62%]">
							<div class="overflow-hidden rounded-4xl">
								<NuxtImg
									v-if="primaryImage?.url"
									:src="primaryImage.url"
									:alt="primaryImage.alternativeText || ''"
									format="webp,avif"
									quality="88"
									loading="lazy"
									placeholder
									sizes="(min-width:1024px) 260px, 60vw"
									class="aspect-[3/4] w-full object-cover max-sm:max-h-60" />
							</div>
						</div>

						<div class="relative z-0 -mt-lg w-[78%]">
							<div class="overflow-hidden rounded-4xl">
								<NuxtImg
									v-if="secondaryImage?.url"
									:src="secondaryImage.url"
									:alt="secondaryImage.alternativeText || ''"
									format="webp,avif"
									quality="88"
									loading="lazy"
									placeholder
									sizes="(min-width:1024px) 320px, 70vw"
									class="aspect-[4/3] w-full object-cover max-sm:max-h-60" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
