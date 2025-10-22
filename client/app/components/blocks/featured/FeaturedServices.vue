<script setup lang="ts">
import type { FeaturedServicesBlock } from "~/types/content/blocks";

defineProps<{ block: FeaturedServicesBlock }>();
</script>

<template>
	<div class="relative w-full flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl">
		<div class="mx-auto w-full h-full px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl max-w-[1600px]">
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				:has_link="false"
				class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" />

			<div class="grid grid-cols-1 md:grid-cols-3 gap-md md:gap-lg lg:gap-xl xl:gap-2xl">
				<Card v-for="service in block.services" :key="service.id" class="h-full relative overflow-hidden">
					<NuxtLink
						:to="`/services/${service.slug}`"
						class="w-full h-full"
						:aria-label="`Läs mer om ${service.title}`">
						<div class="flex flex-col justify-between relative z-10 p-lg lg:p-xl h-full">
							<IconWrapper
								size="lg"
								class="border-primary bg-primary-disabled/50 shadow-primary/40 relative">
								<NuxtImg
									v-if="service.icon.is_image"
									:src="service.icon.image?.url"
									:alt="service.icon.image?.alternativeText || ''"
									format="webp"
									quality="85"
									placeholder
									sizes="80px"
									densities="x1 x2"
									loading="lazy" />
								<Icon
									v-else
									:name="service.icon.icon_name || 'famicons:accessibility-sharp'"
									size="30"
									class="text-primary" />
							</IconWrapper>

							<div class="flex-grow">
								<h3
									class="font-semibold text-heading-sm md:text-heading-md my-sm md:my-md group-hover:text-primary duration-300">
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
			</div>
		</div>
	</div>
</template>
