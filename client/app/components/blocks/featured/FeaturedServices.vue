<script setup lang="ts">
import type { FeaturedServicesBlock } from "~/types/content/blocks";

defineProps<{ block: FeaturedServicesBlock }>();
</script>

<template>
	<section class="relative flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl">
		<div class="mx-auto w-full h-full max-w-[1600px] px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl">
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" />

			<div class="grid grid-cols-1 md:grid-cols-3 gap-md md:gap-lg lg:gap-xl xl:gap-2xl">
				<div
					v-for="service in block.services"
					:key="service.id"
					class="relative h-full flex flex-col rounded-xl group transition duration-300 shadow-lg overflow-hidden bg-light/5">
					<NuxtLink
						:to="`/services/${service.slug}`"
						:aria-label="`Läs mer om ${service.title}`"
						class="flex flex-col justify-between h-full p-lg lg:p-xl">
						<div class="flex flex-col justify-between relative z-10 h-full">
							<div
								size="lg"
								class="border-primary bg-primary-disabled/50 shadow-primary/40 relative flex justify-center items-center rounded-full border shadow-lg text-primary transition duration-300 w-12 h-12 p-xs">
								<NuxtImg
									v-if="service.icon.is_image"
									:src="service.icon.image?.url"
									:alt="service.icon.image?.alternativeText || ''"
									densities="x1 x2"
									width="100"
									height="100"
									sizes="100vw sm:50vw md:33vw"
									format="webp"
									quality="85"
									placeholder
									loading="lazy" />
								<Icon
									v-else
									:name="service.icon.icon_name || 'famicons:accessibility-sharp'"
									size="30"
									class="text-primary" />
							</div>

							<div class="flex-1">
								<h3
									class="font-semibold text-heading-sm md:text-heading-md my-sm md:my-md group-hover:text-primary duration-300">
									{{ service.title }}
								</h3>

								<p class="text-sm md:text-md leading-relaxed mb-sm md:mb-md">
									{{ service.description }}
								</p>
							</div>

							<button
								type="button"
								aria-label="Läs mer om innehållet"
								class="inline-flex items-center text-sm font-semibold text-primary cursor-pointer group focus-visible:outline-primary min-h-[44px] min-w-[44px] ml-auto pr-md">
								Läs mer
								<span
									class="opacity-0 -translate-x-xs transition-all duration-300 pl-sm group-hover:opacity-100 group-hover:translate-x-0 flex justify-center items-center">
									<Icon name="heroicons:arrow-long-right-20-solid" size="16" />
								</span>
							</button>
						</div>

						<div
							class="absolute -bottom-6 -left-6 transition transform rounded-full w-4 h-4 group-hover:scale-[75] bg-gradient-to-tr from-primary/5 via-primary/10 to-primary/20 duration-300" />
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>
</template>
