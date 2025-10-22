<script setup lang="ts">
import type { Service } from "~/types/content/collections";

defineProps<{ services: Service[] }>();
</script>

<template>
	<Grid class="grid-cols-3 grid gap-md md:gap-lg lg:gap-xl xl:gap-2xl">
		<NuxtLink v-for="service in services" :key="service.id" :to="`/services/${service.slug}`">
			<div
				class="p-lg h-full flex flex-col justify-between rounded-xl group transition transform duration-300 shadow-lg">
				<Icon
					v-if="service.icon?.icon_name"
					:name="service.icon.icon_name"
					size="32"
					class="mb-md text-primary" />
				<h3 class="font-semibold text-lg">{{ service.title }}</h3>

				<p class="text-sm mt-sm">{{ service.description }}</p>
			</div>
		</NuxtLink>
	</Grid>
</template>
