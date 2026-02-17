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

definePageMeta({
	layout: "minimal",
});

const articlesRef = ref<HTMLElement[]>([]);

const { currentIndex, goToSection, isDesktop } = useSnapScroll({
	itemsRef: articlesRef,
	duration: 1,
	ease: "power2.inOut",
	tolerance: 10,
	enableFade: true,
	enableScale: true,
	inactiveOpacity: 0.3,
	inactiveScale: 0.95,
	transitionDuration: 0.5,
	preventDefault: true,
	enableKeyboard: true,
	minWidth: 768,
	onChange: (index) => {
		console.log("Changed to section:", index);
	},
});
</script>

<template>
	<section class="relative flex justify-center lg:py-4xl">
		<div class="w-full max-w-[1400px] px-sm md:px-lg xl:px-2xl flex flex-col">
			<div
				v-for="(service, index) in services"
				:key="service.id"
				:ref="
					(element) => {
						if (element) articlesRef[index] = element as HTMLElement;
					}
				"
				class="min-h-screen flex justify-center items-center md:py-0">
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

					<div class="lg:flex-1 flex flex-col justify-center h-full space-y-md lg:space-y-lg">
						<h2 class="font-bold text-heading-md md:text-heading-lg lg:text-heading-xl xl:text-heading-2xl">
							{{ service.title }}
						</h2>

						<div class="space-y-md">
							<StrapiBlocksText v-if="service.content" :nodes="service.content" />
						</div>

						<ul class="flex flex-col space-y-md max-md:mt-md">
							<li
								v-for="subservice in service.subservices"
								:key="subservice.id"
								class="lg:block font-semibold font-heading text-md md:text-lg lg:text-xl">
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

		<Transition
			enter-active-class="transition-opacity duration-300"
			leave-active-class="transition-opacity duration-300"
			enter-from-class="opacity-0"
			leave-to-class="opacity-0">
			<div v-if="isDesktop" class="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-md z-50">
				<button
					v-for="(service, index) in services"
					:key="`dot-${service.id}`"
					@click="goToSection(index)"
					:class="[
						'w-3 h-3 rounded-full transition-all duration-300 cursor-pointer',
						currentIndex === index ? 'bg-black scale-125' : 'bg-black/20 hover:bg-black/40',
					]"
					:aria-label="`Go to ${service.title}`" />
			</div>
		</Transition>
	</section>
</template>
