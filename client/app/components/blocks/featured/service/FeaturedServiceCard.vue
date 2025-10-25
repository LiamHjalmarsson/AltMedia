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
				<div
					class="bg-primary/10 shadow-primary/40 relative flex justify-center items-center rounded-full shadow-lg w-12 h-12 p-xs mb-md">
					<NuxtImg
						v-if="service.icon.is_image"
						:src="service.icon.image?.url"
						:alt="service.icon.image?.alternativeText || service.title"
						format="webp"
						quality="85"
						placeholder
						loading="lazy" />
					<Icon
						v-else
						:name="service.icon.icon_name || 'famicons:accessibility-sharp'"
						size="24"
						class="text-primary" />
				</div>

				<div class="flex-1">
					<h3
						class="font-semibold text-heading-sm md:text-heading-md mb-md md:my-md group-hover:text-primary transition">
						{{ service.title }}
					</h3>

					<p class="text-sm md:text-md text-dark/70 leading-relaxed mb-sm md:mb-md">
						{{ service.description }}
					</p>
				</div>

				<button
					type="button"
					aria-label="Läs mer om innehållet"
					class="inline-flex items-center text-sm font-semibold text-primary cursor-pointer group focus-visible:outline-primary min-h-[44px] min-w-[44px] pr-md">
					Läs mer
					<span
						class="opacity-0 -translate-x-xs transition pl-sm group-hover:opacity-100 group-hover:translate-x-0 flex justify-center items-center">
						<Icon name="lucide:arrow-right" size="16" />
					</span>
				</button>
			</div>

			<div
				ref="bgRef"
				class="absolute -bottom-6 -left-6 rounded-full w-4 h-4 bg-gradient-to-tr from-secondary/5 via-secondary/10 to-primary/20" />
		</NuxtLink>
	</Card>
</template>
