<script setup lang="ts">
import type { Service } from "~/types/content/collections";

defineProps<{
	service: Service;
}>();
</script>

<template>
	<div class="mb-2xl">
		<div>
			<h2 class="font-bold text-heading-xl">
				{{ service.title }}
			</h2>
		</div>
		<Grid class="grid-cols-3 mt-lg">
			<SubServiceCard v-for="sub_service in service.subservices" :key="sub_service.id" :sub_service :service />
		</Grid>
	</div>
</template>
