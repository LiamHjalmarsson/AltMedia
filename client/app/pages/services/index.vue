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
	<section class="relative flex justify-center lg:py-4xl">
		<div class="w-full max-w-[1400px] px-sm md:px-lg xl:px-2xl flex flex-col">
			<div v-for="(service, index) in services" :key="service.id" class="flex justify-center items-center py-5xl">
				<article
					class="flex flex-col lg:flex-row gap-lg lg:gap-4xl justify-start transition-all duration-500"
					:class="index % 2 === 1 ? 'lg:flex-row-reverse' : ''">
					<figure class="lg:flex-1 flex max-lg:max-w-60 max-lg:h-36">
						<NuxtImg
							v-if="service.image?.url"
							:src="service.image.url"
							:alt="service.image.alternativeText || service.title"
							format="webp,avif"
							quality="85"
							loading="lazy"
							class="w-full h-full object-contain" />
					</figure>

					<div class="lg:flex-1 flex flex-col justify-center h-full space-y-lg lg:space-y-2xl">
						<div class="space-y-md lg:space-y-lg">
							<h2
								class="font-bold text-heading-md md:text-heading-lg lg:text-heading-xl xl:text-heading-2xl">
								{{ service.title }}
							</h2>

							<div class="space-y-md">
								<StrapiBlocksText v-if="service.content" :nodes="service.content" />
							</div>
						</div>

						<ul class="flex flex-col">
							<li
								v-for="(subservice, index) in service.subservices"
								:key="subservice.id"
								class="lg:block font-semibold font-heading text-lg md:text-xl lg:text-2xl xl:text-3xl space-x-2xl py-lg border-b border-black/20 last:border-0">
								<span>
									{{ index + 1 }}
								</span>
								<NuxtLink
									v-if="subservice.has_page"
									:to="buildSubservicePath(service.slug, subservice.slug)"
									class="hover:text-primary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
									{{ subservice.title }}
								</NuxtLink>

								<span v-else>
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
