<script setup lang="ts">
import type { FeaturedServicesBlock } from "~/types/blocks/featured";
import FeaturedServiceListItem from "./FeaturedServiceListItem.vue";

defineProps<{ block: FeaturedServicesBlock }>();
</script>

<template>
	<Section>
		<Container>
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				:has_link="false"
				class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" />

			<Grid class="grid grid-cols-1 md:grid-cols-3">
				<FeaturedServiceListItem v-for="service in block.services" :key="service.id" :service="service" />
			</Grid>
		</Container>
	</Section>
</template>
