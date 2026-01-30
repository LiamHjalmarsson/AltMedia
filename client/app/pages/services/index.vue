<script setup lang="ts">
import type { PageContent } from "~/types";

const serviceStore = useServiceStore();

await serviceStore.fetchServices();

const { services } = storeToRefs(serviceStore);

const { findOne } = useStrapi();

const { data: page } = await useAsyncData("servicesPage", async () => {
	const { data } = await findOne<PageContent>("services-page");

	return data;
});

useAppHead(page?.value?.seo || undefined);
</script>

<template>
	<section class="relative py-4xl lg:py-5xl flex justify-center">
		<div class="w-full max-w-[1400px] px-md md:px-lg lg:px-2xl">
			<Heading
				v-if="page?.title"
				tag="h1"
				:title="page?.title"
				:description="page?.description"
				:align_content="page?.align_content"
				class="mt-4xl mb-3xl" />

			<div class="flex flex-col space-y-2xl lg:space-y-4xl" :class="[page?.title ? '' : 'pt-2xl']">
				<article
					v-for="(service, index) in services"
					:key="service.id"
					class="flex flex-col max-lg:items-center lg:flex-row gap-2xl md:gap-xl lg:gap-4xl"
					:class="index % 2 === 1 ? 'lg:flex-row-reverse' : ''">
					<figure class="flex-1 flex max-lg:w-2/3 max-lg:h-36">
						<NuxtImg
							v-if="service.image?.url"
							:src="service.image.url"
							:alt="service.image.alternativeText || service.title"
							format="webp,avif"
							quality="85"
							loading="lazy"
							class="w-full h-full object-contain" />
					</figure>

					<div
						class="flex-1 flex flex-col justify-center h-full space-y-xl lg:space-y-lg max-w-[750px] lg:max-w-[600px]">
						<h2 class="font-bold text-heading-lg md:text-heading-xl lg:text-heading-2xl leading-tight">
							{{ service.title }}
						</h2>

						<div class="space-y-md">
							<StrapiBlocksText v-if="service.content" :nodes="service.content" />
						</div>

						<ul class="space-y-sm flex flex-wrap space-x-xl">
							<li
								v-for="subservice in service.subservices"
								:key="subservice.id"
								class="lg:block font-semibold font-heading text-heading-xs">
								<NuxtLink
									v-if="subservice.has_page"
									:to="buildSubservicePath(service.slug, subservice.slug)"
									class="hover:text-primary text-lg md:text-xl lg:text-2xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
									{{ subservice.title }}
								</NuxtLink>

								<span v-else class="">
									{{ subservice.title }}
								</span>
							</li>
						</ul>
					</div>
				</article>
			</div>
		</div>
	</section>
</template>
