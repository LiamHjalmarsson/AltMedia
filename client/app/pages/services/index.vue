<script setup lang="ts">
import type { PageContent } from "~/types";

const serviceStore = useServiceStore();

const { $setSeo } = useNuxtApp();

await serviceStore.fetchServices();

const { services } = storeToRefs(serviceStore);

const { findOne } = useStrapi();

const { data: page } = await useAsyncData("servicesPage", async () => {
	const res = await findOne<PageContent>("services-page");

	return res.data;
});

useAppHead(page?.value?.seo || undefined);
</script>

<template>
	<section class="relative py-5xl flex justify-center">
		<div class="w-full max-w-[1300px] px-md md:px-lg lg:px-2xl">
			<Heading
				:title="page?.title"
				:description="page?.description"
				:align_content="page?.align_content"
				class="mt-xl mb-2xl" />

			<div
				v-for="(service, index) in services"
				:key="service.id"
				class="mb-2xl lg:mb-4xl flex flex-col lg:flex-row gap-xl md:gap-2xl lg:gap-3xl"
				:class="index % 2 === 1 ? 'lg:flex-row-reverse' : ''">
				<div class="flex-1 flex">
					<NuxtImg
						v-if="service.image?.url"
						:src="service.image.url"
						:alt="service.image.alternativeText || service.title"
						format="webp,avif"
						quality="85"
						class="w-full h-full object-cover shadow-2xl"
						loading="lazy" />
				</div>

				<div class="flex-1 flex flex-col justify-center h-full space-y-md lg:space-y-lg">
					<h3 class="font-bold text-heading-lg md:text-heading-xl leading-tight">
						{{ service.title }}
					</h3>

					<p v-if="service.description" class="text-lg max-w-[600px] leading-relaxed">
						{{ service.description }}
					</p>

					<ul class="space-y-xs">
						<li
							v-for="subservice in service.subservices"
							:key="subservice.id"
							class="font-semibold font-heading group">
							<ReadMoreLink
								:to="`/services/${service.slug}/${subservice.slug}`"
								:label="subservice.title"
								size="20"
								class="text-lg inline-flex items-center font-semibold font-heading" />
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>
