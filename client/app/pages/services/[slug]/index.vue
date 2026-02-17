<script setup lang="ts">
const route = useRoute();

const serviceStore = useServiceStore();

const { currentService } = storeToRefs(serviceStore);

const slug = computed(() => route.params.slug as string);

await useAsyncData(
	() => `service:${slug.value}`,
	() => serviceStore.fetchService(slug.value),
	{ server: true, lazy: true, watch: [slug] },
);
</script>

<template>
	<section class="relative flex justify-center">
		<div
			class="w-full max-w-[1400px] px-sm md:px-lg xl:px-2xl min-h-screen flex justify-center items-center py-5xl">
			<article
				v-if="currentService"
				class="flex flex-col lg:flex-row gap-lg lg:gap-4xl justify-center transition-all duration-500">
				<figure class="lg:flex-1 flex max-lg:max-w-60 max-lg:h-36">
					<NuxtImg
						v-if="currentService.image?.url"
						:src="currentService.image.url"
						:alt="currentService.image.alternativeText || currentService.title"
						format="webp,avif"
						quality="85"
						loading="lazy"
						class="w-full h-full object-contain" />
				</figure>

				<div class="lg:flex-1 flex flex-col justify-center h-full space-y-lg lg:space-y-2xl">
					<div class="space-y-md lg:space-y-lg">
						<h1 class="font-bold text-heading-lg sm:text-heading-xl md:text-heading-2xl mb-lg">
							{{ currentService.title }}
						</h1>

						<p
							v-if="currentService.description"
							class="text-xl md:text-2xl lg:text-3xl font-body font-medium text-black/80">
							{{ currentService.description }}
						</p>
					</div>
					<ul class="flex flex-col">
						<li
							v-for="(subservice, index) in currentService.subservices"
							:key="subservice.id"
							class="lg:block font-semibold font-heading text-lg md:text-xl lg:text-2xl xl:text-3xl space-x-2xl py-lg border-b border-black/20 last:border-0">
							<span>
								{{ index + 1 }}
							</span>

							<NuxtLink
								v-if="subservice.has_page"
								:to="buildSubservicePath(currentService.slug, subservice.slug)"
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
	</section>
</template>
