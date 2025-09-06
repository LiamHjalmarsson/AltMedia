<script setup lang="ts">
import type { FeaturedServices } from "~/types/collections/service";

import FeaturedServiceListItem from "./FeaturedServiceListItem.vue";

defineProps<{ block: FeaturedServices }>();
</script>

<template>
	<Section>
		<Container>
			<Heading
				:title="block.heading.title"
				:align-content="block.heading.align_content"
				:has_link="false"
				class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" />

			<Grid class="grid grid-cols-1 md:grid-cols-3">
				<FeaturedServiceListItem v-for="service in block.services" :key="service.id" :service="service" />
			</Grid>
		</Container>
	</Section>
</template>
