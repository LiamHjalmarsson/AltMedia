<script setup lang="ts">
import type { Service, Subservice } from "~/types/content/collections";

defineProps<{
	sub_service: Subservice;
	service: Service;
}>();
</script>

<template>
	<NuxtLink :to="`/tjänster/${service.slug}/${sub_service.slug}`" class="h-full flex">
		<Card class="w-full lg:hover:shadow-2xl p-xl">
			<div class="flex justify-between items-start mb-md">
				<h3 class="font-semibold text-heading-md text-dark group-hover:text-primary">
					{{ sub_service.title }}
				</h3>

				<div v-if="sub_service.tags?.length" class="flex flex-wrap gap-xs text-xs font-medium text-dark-gray">
					<span v-for="tag in sub_service.tags" :key="tag.title" class="px-xs py-xxs">
						{{ tag.title }}
					</span>
				</div>
			</div>

			<div v-if="sub_service.content" class="text-sm text-dark-gray leading-relaxed line-clamp-3">
				<StrapiBlocksText :nodes="sub_service.content" />
			</div>

			<div class="mt-auto ml-auto pt-md">
				<ReadMoreButton />
			</div>
		</Card>
	</NuxtLink>
</template>
