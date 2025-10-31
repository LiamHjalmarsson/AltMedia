<script setup lang="ts">
const route = useRoute();

const serviceStore = useServiceStore();

const { currentService } = storeToRefs(serviceStore);

const slug = computed(() => route.params.slug as string);

await useAsyncData(
	() => `service:${slug.value}`,
	() => serviceStore.fetchService(slug.value),
	{ server: true, watch: [slug] }
);

watchEffect(() => {
	const service = currentService.value;

	useSeoMeta({
		title: service?.title ?? "Tjänst",
		description: service?.description ?? "Tjänst från Alt Media.",
		ogTitle: service?.title ?? "Tjänst",
		ogDescription: service?.description ?? "Tjänst från Alt Media.",
		twitterCard: "summary_large_image",
	});
});
</script>

<template>
	<section class="relative py-4xl lg:py-5xl flex justify-center">
		<div class="w-full max-w-[1300px] px-md md:px-lg lg:px-2xl">
			<div v-if="currentService" class="flex flex-col lg:flex-row gap-2xl lg:gap-3xl my-4xl">
				<div class="flex-1 flex">
					<NuxtImg
						v-if="currentService.image?.url"
						:src="currentService.image.url"
						:alt="currentService.image.alternativeText || currentService.title"
						format="webp"
						quality="85"
						class="w-full h-full object-cover rounded-2xl shadow-2xl"
						loading="lazy" />
				</div>

				<div class="flex-1 flex flex-col justify-center h-full">
					<h1 class="font-bold text-heading-xl md:text-heading-2xl mb-lg leading-tight">
						{{ currentService.title }}
					</h1>

					<p v-if="currentService.description" class="text-lg mb-xl max-w-[600px] leading-relaxed">
						{{ currentService.description }}
					</p>
				</div>
			</div>

			<div v-if="currentService?.subservices?.length" class="mt-4xl">
				<h2 class="font-bold text-heading-lg md:text-heading-xl mb-xl text-primary">Våra delmoment</h2>

				<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-xl">
					<div
						v-for="sub in currentService.subservices"
						:key="sub.id"
						class="group rounded-2xl border border-light/10 bg-light/5 backdrop-blur-md p-xl shadow-lg hover:shadow-2xl transition-all duration-300">
						<h3
							class="font-semibold text-heading-sm md:text-heading-md group-hover:text-primary transition">
							{{ sub.title }}
						</h3>

						<p class="text-sm leading-relaxed mt-xs line-clamp-3">XX</p>

						<div class="mt-lg flex justify-between items-center">
							<NuxtLink
								:to="`/services/${currentService.slug}/${sub.slug}`"
								class="inline-flex items-center space-x-xs text-primary text-sm font-semibold">
								<span>Läs mer</span>
								<Icon
									name="lucide:arrow-right"
									size="16"
									class="translate-x-0 group-hover:translate-x-1 transition" />
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
