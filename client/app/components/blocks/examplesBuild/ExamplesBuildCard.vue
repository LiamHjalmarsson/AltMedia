<script setup lang="ts">
import type { BuildItem } from "~/types";

defineProps<{ item: BuildItem }>();
</script>

<template>
	<Card class="p-lg text-center flex flex-col items-center">
		<NuxtImg
			v-if="item.icon?.is_image && item.icon.image?.url"
			:src="item.icon.image.url"
			:alt="item.icon.image.alternativeText || item.title"
			format="webp,avif"
			quality="85"
			width="100"
			height="100" />

		<Icon v-else-if="item.icon?.icon_name" :name="item.icon.icon_name" size="40" class="text-primary" />

		<div class="space-y-sm mb-lg mt-xl">
			<h3 class="text-heading-md font-bold">{{ item.title }}</h3>

			<p v-if="item.description" class="text-sm text-black/80">
				{{ item.description }}
			</p>
		</div>

		<ul v-if="item.subservices?.length" class="space-y-xs w-full">
			<li
				v-for="sub in item.subservices"
				:key="sub.id"
				class="flex items-center justify-center text-xs font-medium text-black/80 pb-xs border-b border-b-black/10">
				<span>{{ sub.title }}</span>
			</li>
		</ul>
	</Card>
</template>
