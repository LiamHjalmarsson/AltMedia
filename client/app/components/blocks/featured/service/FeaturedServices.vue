<script setup lang="ts">
import type { FeaturedServicesBlock } from "~/types/content/blocks";

defineProps<{ block: FeaturedServicesBlock }>();
</script>

<template>
	<section class="relative flex justify-center items-center p-lg lg:p-2xl">
		<div class="mx-auto w-full h-full max-w-[1600px] px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl">
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				class="mb-md lg:mb-lg xl:mb-xl" />

			<div class="grid grid-cols-1 md:grid-cols-3 gap-xl md:gap-lg lg:gap-xl xl:gap-2xl">
				<FeaturedServiceCard v-for="service in block.services" :key="service.id" :service="service" />
			</div>
		</div>
	</section>
</template>
