<script setup lang="ts">
import type { Subservice } from "~/types/content/collections";

const props = defineProps<{
	subservice: Subservice;
}>();

console.log(props);
</script>

<template>
	<Section>
		<Container>
			<Grid class="md:grid-cols-4">
				<div class="md:col-span-3 pr-2xl">
					<h2 class="text-heading-xl font-bold mb-sm">{{ subservice.title }}</h2>
					<StrapiBlocksText :nodes="subservice.content || []" />
				</div>

				<aside v-if="subservice.tags?.length">
					<h3 class="text-heading-lg font-bold mb-sm mt-xs">Vad vi gjort</h3>
					<ul class="space-y-md grow">
						<li v-for="(tag, i) in subservice.tags" :key="tag.id" class="flex items-center">
							<span
								class="w-6 h-6 flex justify-center items-center text-heading-sm font-semibold font-heading text-primary p-sm border border-primary bg-primary-disabled rounded-full">
								{{ i + 1 }}
							</span>
							<span class="text-heading-xs font-medium ml-md first-letter:capitalize truncate">
								{{ tag.title }}
							</span>
						</li>
					</ul>
				</aside>
			</Grid>
		</Container>
	</Section>
</template>
