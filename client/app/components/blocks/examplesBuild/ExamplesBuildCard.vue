<script setup lang="ts">
import type { BuildItem } from "~/types/content/blocks";

defineProps<{ item: BuildItem }>();
</script>

<template>
	<Card class="p-lg">
		<div class="flex justify-center items-center mb-md">
			<NuxtImg
				v-if="item.icon?.is_image"
				:src="item.icon.image?.url"
				:alt="item.icon.image?.alternativeText || item.title"
				format="webp"
				quality="85"
				width="100"
				height="100"
				loading="lazy" />
			<Icon v-else-if="item.icon?.icon_name" :name="item.icon.icon_name" size="40" class="text-primary" />
		</div>

		<div class="mb-md flex-1 space-y-sm">
			<h3 class="text-heading-md font-bold text-center">
				{{ item.title }}
			</h3>

			<p v-if="item.description" class="text-sm text-dark-gray text-center">
				{{ item.description }}
			</p>

			<h4 class="text-xl font-bold text-primary text-center my-md">
				{{ item.price }}
			</h4>

			<ul class="space-y-xs mb-md">
				<li
					v-for="(subservice, i) in item.subservices"
					:key="i"
					class="flex items-center text-sm text-dark-gray">
					<Icon name="lucide:check-circle" size="18" class="text-green-500 mr-xs" />
					<span>
						{{ subservice.title }}
					</span>
				</li>
			</ul>
		</div>
	</Card>
</template>
