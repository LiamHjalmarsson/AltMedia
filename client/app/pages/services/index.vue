<script setup lang="ts">
const serviceStore = useServiceStore();

const { services } = storeToRefs(serviceStore);

await useAsyncData("services", () => serviceStore.fetchServices(), { server: true });
</script>

<template>
	<Section>
		<Container>
			<Heading :has_link="false" title="Våra tjänster" align-content="center" class="mt-xxl" />
		</Container>
	</Section>
</template>
