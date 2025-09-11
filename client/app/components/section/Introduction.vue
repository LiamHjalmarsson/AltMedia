<script setup lang="ts">
import type { Introduction } from "~/types/shared";

defineProps<{
	introduction: Introduction;
}>();
</script>

<template>
	<Section>
		<Container>
			<Grid class="md:grid-cols-4">
				<div class="md:col-span-3 pr-2xl">
					<h2 class="text-heading-xl font-bold mb-sm">{{ introduction.title }}</h2>
					<StrapiBlocksText :nodes="introduction.description || []" />
				</div>

				<aside>
					<h3 class="text-heading-lg font-bold mb-sm mt-xs">{{ introduction.subtitle }}</h3>
					<ol class="space-y-md grow">
						<li
							v-for="(subService, i) in introduction.subservices"
							:key="subService.id"
							class="font-semibold">
							<NuxtLink :to="`/services/${subService.service?.slug}`" class="flex items-center">
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
			</Grid>
		</Container>
	</Section>
</template>
