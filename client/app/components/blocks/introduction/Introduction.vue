<script setup lang="ts">
import type { Introduction } from "~/types";

defineProps<{
	block: Introduction;
}>();
</script>

<template>
	<section class="relative mx-auto max-w-[1600px] pb-3xl lg:pb-5xl">
		<div class="grid md:grid-cols-4 gap-md md:gap-lg lg:gap-xl xl:gap-2xl">
			<div class="md:col-span-3 pr-2xl">
				<h2 class="text-heading-2xl font-bold mb-sm">{{ block.title }}</h2>
				<StrapiBlocksText :nodes="block.description || []" />
			</div>

			<aside>
				<h3 class="text-heading-lg font-bold mb-sm mt-xs">{{ block.subtitle }}</h3>
				<ol class="space-y-md grow">
					<li v-for="(subService, i) in block.subservices" :key="subService.id" class="font-semibold">
						<NuxtLink
							v-if="subService.service?.slug"
							:to="`/services/${subService.service.slug}`"
							class="flex items-center">
							<span
								class="w-6 h-6 flex justify-center items-center text-heading-sm font-semibold font-heading text-primary p-sm border border-primary bg-primary-disabled rounded-full">
								{{ i + 1 }}
							</span>
							<span class="text-heading-xs font-medium ml-md first-letter:capitalize truncate">
								{{ subService.title }}
							</span>
						</NuxtLink>
					</li>
				</ol>
			</aside>
		</div>
	</section>
</template>
