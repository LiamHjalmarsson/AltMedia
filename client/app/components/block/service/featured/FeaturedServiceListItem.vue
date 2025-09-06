<script setup lang="ts">
import type { FeaturedService } from "~/types/collections/service";

const { service } = defineProps<{ service: FeaturedService }>();

const slug = computed(() => `/services/${service.slug}`);
</script>

<template>
	<Card class="h-full relative overflow-hidden">
		<NuxtLink :to="slug" class="w-full h-full" :aria-label="`Läs mer om ${service.title}`">
			<div class="flex flex-col justify-between relative z-10 p-lg lg:p-xl h-full">
				<IconWrapper size="lg" class="border-primary bg-primary-disabled/50 shadow-primary/40 relative">
					<NuxtImg v-if="service.icon.is_image" :src="service.icon.image?.url" />
					<Icon
						v-else
						:name="service.icon.icon_name || 'famicons:accessibility-sharp'"
						size="30"
						class="text-primary" />
				</IconWrapper>

				<div class="flex-grow">
					<h3 class="font-semibold text-heading-sm md:text-heading-md my-sm md:my-md">
						{{ service.title }}
					</h3>

					<div class="text-sm md:text-md leading-relaxed mb-sm md:mb-md">
						{{ service.description }}
					</div>
				</div>

				<ReadMoreButton class="ml-auto pr-md" />
			</div>

			<div
				class="absolute -bottom-6 -left-6 transition transform rounded-full w-4 h-4 group-hover:scale-[75] bg-gradient-to-tr from-primary/5 via-primary/10 to-primary/20 duration-300"></div>
		</NuxtLink>
	</Card>
</template>
