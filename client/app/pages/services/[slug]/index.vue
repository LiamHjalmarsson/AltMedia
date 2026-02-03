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
	<section class="relative py-4xl lg:py-5xl flex justify-center">
		<div class="w-full max-w-[1300px] px-lg lg:px-2xl">
			<article
				v-if="currentService"
				class="flex flex-col items-center justify-center lg:flex-row gap-xl md:gap-2xl lg:gap-3xl mt-xl lg:mt-4xl">
				<figure class="flex-1 flex justify-center lg:justify-start">
					<NuxtImg
						v-if="currentService.image?.url"
						:src="currentService.image.url"
						:alt="currentService.image.alternativeText || currentService.title"
						format="webp,avif"
						quality="85"
						class="w-full max-w-[520px] lg:max-w-none h-auto object-contain"
						loading="lazy" />
				</figure>

				<div class="flex-1 flex flex-col justify-center h-full">
					<h1
						class="font-bold max-lg:text-center text-heading-lg sm:text-heading-xl md:text-heading-2xl mb-lg">
						{{ currentService.title }}
					</h1>

					<p
						v-if="currentService.description"
						class="max-lg:text-center text-xs md:text-md lg:text-lg leading-[1.8] text-black/80 max-w-[600px]">
						{{ currentService.description }}
					</p>
				</div>
			</article>

			<ul v-if="currentService?.subservices?.length" class="grid grid-cols-1 gap-3xl lg:gap-4xl mt-3xl">
				<li v-for="(subservice, index) in currentService.subservices" :key="subservice.id" class="h-full">
					<SubserviceCard :serviceSlug="currentService.slug" :subservice="subservice" :index="index" />
				</li>
			</ul>
		</div>
	</section>
</template>
