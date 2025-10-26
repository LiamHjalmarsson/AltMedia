<script setup lang="ts">
import type { FeaturedServicesBlock } from "~/types/content/blocks";

defineProps<{ block: FeaturedServicesBlock }>();
</script>

<template>
	<section class="relative py-5xl">
		<div class="mx-auto max-w-[1400px] px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl">
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" />

			<div class="grid grid-cols-1 md:grid-cols-3 gap-xl md:gap-lg lg:gap-xl xl:gap-3xl">
				<FeaturedServiceCard v-for="service in block.services" :key="service.id" :service="service" />
			</div>
		</div>
	</section>
</template>
