<script setup lang="ts">
const serviceStore = useServiceStore();

const { services } = storeToRefs(serviceStore);

await useAsyncData("services", () => serviceStore.fetchServices(), { server: true });
</script>

<template>
	<Section>
		<Container>
			<Heading title="Våra tjänster" align_content="center" class="mt-xxl" />

			<Filter :services basePath="/services" />

			<div v-for="(service, i) in services" :key="service.id" class="mb-xxl">
				<div>
					<h2 class="font-bold text-heading-xl">
						{{ service.title }}
					</h2>
				</div>
				<Grid class="grid-cols-3 mt-lg">
					<SubServiceCard
						v-for="sub_service in service.subservices"
						:key="sub_service.id"
						:service
						:sub_service
						class="w-full" />
				</Grid>
			</div>
		</Container>
	</Section>
</template>
