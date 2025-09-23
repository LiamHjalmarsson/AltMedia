<script setup lang="ts">
import type { Service } from "~/types/content/collections";

const props = defineProps<{
	service: Service;
}>();
</script>

<template>
	<div class="mb-2xl">
		<Grid class="grid-cols-2 mt-lg">
			<SubServiceCard
				v-for="sub_service in service.subservices"
				:key="sub_service.id"
				:sub_service
				:service="service" />
		</Grid>
	</div>
</template>
