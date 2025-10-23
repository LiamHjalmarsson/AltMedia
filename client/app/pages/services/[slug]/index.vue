<script setup lang="ts">
const route = useRoute();

const serviceStore = useServiceStore();

const { services, currentService } = storeToRefs(serviceStore);

await useAsyncData("services", () => serviceStore.fetchServices(), { server: true });

watch(
	() => route.params.slug,
	async (slug) => {
		await serviceStore.fetchService(slug as string);
	},
	{ immediate: true }
);
</script>

<template>
	<section class="relative w-full flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl">
		<div class="mx-auto w-full h-full px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl max-w-[1600px]">
			<Heading title="Våra tjänster" align_content="center" class="mt-2xl" />

			<Filter :services="services" base-path="/services" />

			<ServiceDetails v-if="currentService" :service="currentService" />
		</div>
	</section>
</template>
