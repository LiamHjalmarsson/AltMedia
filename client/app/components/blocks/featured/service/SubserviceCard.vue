<script setup lang="ts">
import type { Subservice } from "~/types";

const { hoverBubbleElementRef, animateBubbleToHoverState, animateBubbleToIdleState } = useBackgroundBubble();

const props = defineProps<{
	subservice: Subservice;
	serviceSlug: string;
	index: number;
}>();

const isEvenRow = computed(() => (props.index + 1) % 2 === 0);
</script>

<template>
	<article
		@mouseenter="animateBubbleToHoverState"
		@mouseleave="animateBubbleToIdleState"
		class="group relative overflow-hidden transition-all duration-300">
		<div class="grid lg:grid-cols-2 lg:gap-4xl items-center p-lg lg:p-xl">
			<div :class="['hidden lg:flex justify-center', isEvenRow ? 'order-1' : 'order-2']">
				<NuxtImg
					v-if="subservice.icon.is_image"
					:src="subservice.icon.image?.url"
					:alt="subservice.icon.image?.alternativeText || subservice.title"
					format="webp,avif"
					quality="85"
					class="w-full h-auto object-contain"
					loading="lazy" />
			</div>

			<div
				:class="[
					'relative z-10 flex flex-col justify-between h-full',
					isEvenRow ? 'lg:order-2' : 'lg:order-1',
				]">
				<NuxtImg
					v-if="subservice.icon.is_image"
					:src="subservice.icon.image?.url"
					:alt="subservice.icon.image?.alternativeText || subservice.title"
					format="webp,avif"
					quality="85"
					class="lg:hidden mb-lg w-full h-auto object-contain"
					loading="lazy" />

				<NuxtLink
					v-if="subservice.has_page"
					:to="buildSubservicePath(serviceSlug, subservice.slug)"
					:aria-label="`Läs mer om ${subservice.title}`"
					class="flex flex-col justify-between h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
					<div class="flex-1">
						<h3
							class="font-semibold font-heading text-heading-lg md:text-heading-xl tracking-tighter mb-md group-hover:text-primary transition break-words">
							{{ subservice.title }}
						</h3>

						<div v-if="subservice.description" class="space-y-md mt-lg">
							<p class="text-black/80">
								{{ subservice.description }}
							</p>
						</div>
					</div>

					<ReadMoreButton class="mt-lg" />
				</NuxtLink>

				<div v-else class="flex flex-col justify-between h-full">
					<div class="flex-1">
						<h3
							class="font-semibold font-heading text-heading-lg md:text-heading-xl tracking-tighter break-words">
							{{ subservice.title }}
						</h3>

						<div v-if="subservice.description" class="space-y-md mt-lg">
							<p class="text-black/80">
								{{ subservice.description }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</article>
</template>
