<script setup lang="ts">
import { useCardHover } from "~/composables/useCardHover";
import type { Service } from "~/types/content/collections";

const { bgRef, onEnter, onLeave } = useCardHover();

defineProps<{ service: Service }>();
</script>

<template>
	<Card @mouseenter="onEnter" @mouseleave="onLeave" class="overflow-hidden border border-light-gray/50">
		<NuxtLink
			:to="`/services/${service.slug}`"
			:aria-label="`Läs mer om ${service.title}`"
			class="flex flex-col justify-between h-full p-lg lg:p-xl focus-visible:outline-primary">
			<div class="flex flex-col justify-between relative z-10 h-full">
				<IconBadge v-if="service.icon" :icon="service.icon" variant="primary" size="50" />

				<div class="flex-1">
					<h3
						class="font-semibold text-heading-sm md:text-heading-md mb-md md:my-md group-hover:text-primary transition">
						{{ service.title }}
					</h3>

					<p class="text-sm md:text-md text-dark/80 leading-relaxed mb-sm md:mb-md">
						{{ service.description }}
					</p>
				</div>

				<ReadMoreButton />
			</div>

			<div
				ref="bgRef"
				class="absolute -bottom-5 -left-5 rounded-full w-4 h-4 bg-gradient-to-tr from-secondary/5 via-secondary/10 to-primary/20" />
		</NuxtLink>
	</Card>
</template>
