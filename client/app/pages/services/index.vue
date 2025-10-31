<script setup lang="ts">
const serviceStore = useServiceStore();

const { services } = storeToRefs(serviceStore);

await useAsyncData("services", () => serviceStore.fetchServices(), { server: true });
</script>

<template>
	<section class="relative py-4xl lg:py-5xl flex justify-center">
		<div class="w-full max-w-[1300px] px-md md:px-lg lg:px-2xl">
			<Heading
				title="Våra tjänster"
				description="Vår expertis inom design och teknik levererar toppmärken och digitala upplevelser."
				align_content="start"
				class="mt-xl mb-2xl" />

			<div
				v-for="(service, index) in services"
				:key="service.id"
				class="mb-4xl flex flex-col lg:flex-row gap-2xl lg:gap-3xl"
				:class="index % 2 === 1 ? 'lg:flex-row-reverse' : ''">
				<div class="flex-1 flex">
					<NuxtImg
						v-if="service.image?.url"
						:src="service.image.url"
						:alt="service.image.alternativeText || service.title"
						format="webp"
						quality="85"
						class="w-full h-full object-cover shadow-2xl"
						loading="lazy" />
				</div>

				<div class="flex-1 flex flex-col justify-center h-full space-y-lg">
					<h3 class="font-bold text-heading-xl md:text-heading-2xl leading-tight">
						{{ service.title }}
					</h3>

					<p v-if="service.description" class="text-lg max-w-[600px] leading-relaxed">
						{{ service.description }}
					</p>

					<ul class="space-y-xs">
						<li
							v-for="subservice in service.subservices"
							:key="subservice.id"
							class="font-semibold text-lg font-heading group">
							<NuxtLink :to="`/services/${service.slug}/${subservice.slug}`">
								<span class="inline-flex items-center font-semibold text-lg font-heading">
									<span>{{ subservice.title }}</span>
									<Icon
										name="lucide:arrow-right"
										size="16"
										class="ml-xs group-hover:translate-x-[3px] transition-transform duration-300" />
								</span>
							</NuxtLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>
