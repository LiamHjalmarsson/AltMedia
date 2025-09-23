<script setup lang="ts">
import { useServiceStore } from "~/stores/services";

const route = useRoute();
const serviceStore = useServiceStore();
const { services, currentService } = storeToRefs(serviceStore);

await useAsyncData("service", () => serviceStore.fetchService(route.params.slug as string), { server: true });
</script>

<template>
	<Section>
		<Container>
			<Heading title="Våra tjänster" align_content="center" class="mt-xxl" />

			<Filter :services="services" />

			<ServiceDetails v-if="currentService" :service="currentService" />
		</Container>
	</Section>
</template>
