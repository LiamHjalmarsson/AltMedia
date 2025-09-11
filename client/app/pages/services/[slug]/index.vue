<script setup lang="ts">
const route = useRoute();

const serviceStore = useServiceStore();

const { services } = storeToRefs(serviceStore);

await useAsyncData("services", () => serviceStore.fetchServices(), { server: true });

const selected = computed(() => route.params.slug as string | null);

const currentService = computed(() => services.value.find((service) => service.slug === selected.value));
</script>

<template>
	<Section>
		<Container>
			<Heading title="Våra tjänster" align-content="center" class="mt-2xl" />

			<Filter :services="services" />

			<div v-if="currentService" class="mb-2xl">
				<Grid class="grid-cols-2 mt-lg">
					<SubServiceCard
						v-for="sub_service in currentService.subservices"
						:key="sub_service.id"
						:sub_service
						:service="currentService" />
				</Grid>
			</div>
		</Container>
	</Section>
</template>
