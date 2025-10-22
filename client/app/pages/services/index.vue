<script setup lang="ts">
const serviceStore = useServiceStore();

const { services } = storeToRefs(serviceStore);

await useAsyncData("services", () => serviceStore.fetchServices(), { server: true });
</script>

<template>
	<section class="relative w-full flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl">
		<div class="mx-auto w-full h-full px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl max-w-[1600px]">
			<Heading title="Våra tjänster" align_content="center" class="mt-2xl" />

			<Filter :services="services" base-path="/services" />

			<div v-for="service in services" :key="service.id" class="mb-2xl">
				<h2 class="font-bold text-heading-xl">{{ service.title }}</h2>
				<div class="grid grid-cols-3 gap-2xl mt-xl">
					<SubServiceCard
						v-for="sub_service in service.subservices"
						:key="sub_service.id"
						:service
						:sub_service
						class="w-full" />
				</div>
			</div>
		</div>
	</section>
</template>
