<script setup lang="ts">
import type { Service } from "~/types/collectionTypes/service";

const { hoverBubbleElementRef, animateBubbleToHoverState, animateBubbleToIdleState } = useBackgroundBubble();

defineProps<{ service: Service }>();
</script>

<template>
	<div
		@mouseenter="animateBubbleToHoverState"
		@mouseleave="animateBubbleToIdleState"
		class="overflow-hidden border border-white/40 relative shadow-lg transition-all duration-300 focus-visible:outline-primary h-full flex flex-col group">
		<NuxtLink
			:to="buildServiceDetailsPath(service.slug)"
			:aria-label="`Läs mer om ${service.title}`"
			class="flex flex-col justify-between h-full p-lg lg:p-xl focus-visible:outline-primary">
			<div class="flex flex-col justify-between relative z-10 h-full">
				<IconBadge v-if="service.icon" :icon="service.icon" :size="155" />

				<div class="flex-1">
					<h3
						class="font-semibold text-heading-md md:text-heading-lg lg:text-heading-xl tracking-tighter mb-sm lg:mb-md group-hover:text-primary transition break-words">
						{{ service.title }}
					</h3>

					<p class="text-sm md:text-md lg:text-lg text-black/90 leading-relaxed mb-sm lg:mb-md">
						{{ service.description }}
					</p>
				</div>

				<ReadMoreButton />
			</div>

			<div
				ref="hoverBubbleElementRef"
				class="absolute -bottom-5 -left-5 rounded-full w-4 h-4 bg-gradient-to-tr from-secondary/5 via-secondary/10 to-primary/20" />
		</NuxtLink>
	</div>
</template>
