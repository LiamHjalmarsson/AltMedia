<script setup lang="ts">
import type { FeaturedServicesBlock } from "~/types/content/blocks";

defineProps<{ block: FeaturedServicesBlock }>();
</script>

<template>
	<Section>
		<Container>
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				:has_link="false"
				class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" />

			<Grid class="grid grid-cols-1 md:grid-cols-3">
				<Card v-for="service in block.services" :key="service.id" class="h-full relative overflow-hidden">
					<NuxtLink
						:to="`/services/${service.slug}`"
						class="w-full h-full"
						:aria-label="`Läs mer om ${service.title}`">
						<div class="flex flex-col justify-between relative z-10 p-lg lg:p-xl h-full">
							<IconWrapper
								size="lg"
								class="border-primary bg-primary-disabled/50 shadow-primary/40 relative">
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
			</Grid>
		</Container>
	</Section>
</template>
