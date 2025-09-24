<script setup lang="ts">
import type { Service, Subservice } from "~/types/content/collections";

defineProps<{
	sub_service: Subservice;
	service: Service;
}>();
</script>

<template>
	<NuxtLink :to="`/services/${service.slug}/${sub_service.slug}`" class="h-full flex">
		<Card class="p-lg">
			<div class="flex justify-between items-center">
				<h3 class="font-semibold text-heading-sm">
					{{ sub_service.title }}
				</h3>
				<div class="flex items-center gap-xs font-semibold text-sm text-dark-gray">
					<span v-for="tag in sub_service.tags" :key="tag.title">
						{{ tag.title }}
					</span>
				</div>
			</div>

			<div v-if="sub_service.content" class="mt-md">
				<StrapiBlocksText :nodes="sub_service.content" />
			</div>
		</Card>
	</NuxtLink>
</template>
