<script setup lang="ts">
import type { Website } from "~/types/content/collections";

defineProps<{ website: Website }>();
</script>

<template>
	<Card class="p-lg">
		<div class="flex justify-center items-center mb-md">
			<NuxtImg
				v-if="website.icon?.is_image"
				:src="website.icon.image?.url"
				:alt="website.icon.image?.alternativeText || website.title"
				format="webp"
				quality="85"
				width="100"
				height="100"
				loading="lazy" />
			<Icon v-else-if="website.icon?.icon_name" :name="website.icon.icon_name" size="40" class="text-primary" />
		</div>

		<div class="mb-md flex-1 space-y-sm">
			<h3 class="text-heading-md font-bold text-center">
				{{ website.title }}
			</h3>

			<p class="text-sm text-dark-gray text-center">
				{{ website.description }}
			</p>

			<h4 class="text-xl font-bold text-primary text-center my-md">
				{{ website.price }}
			</h4>

			<ul class="space-y-xs mb-md">
				<li
					v-for="(subservice, i) in website.subservices"
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
