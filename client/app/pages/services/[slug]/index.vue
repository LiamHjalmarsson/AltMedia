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
	<Section>
		<Container>
			<Heading title="Våra tjänster" align_content="center" class="mt-xxl" />

			<Filter :services="services" base-path="/tjänster" />

			<ServiceDetails v-if="currentService" :service="currentService" />
		</Container>
	</Section>
</template>
