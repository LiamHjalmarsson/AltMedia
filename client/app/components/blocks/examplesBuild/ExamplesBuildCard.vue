<script setup lang="ts">
import type { BuildItem } from "~/types";

defineProps<{ item: BuildItem }>();
</script>

<template>
	<Card class="p-lg text-center flex flex-col items-center border border-white/50">
		<div class="flex flex-col justify-between items-center relative z-10 h-full">
			<NuxtImg
				v-if="item.icon?.is_image && item.icon.image?.url"
				:src="item.icon.image.url"
				:alt="item.icon.image.alternativeText || item.title"
				format="webp,avif"
				quality="85"
				width="100"
				height="100" />

			<IconBadge v-if="item.icon?.icon_name" :icon="item.icon" variant="primary" :size="50" />

			<div class="flex-1">
				<h3 class="font-semibold text-heading-sm md:text-heading-lg mb-md md:my-md">
					{{ item.title }}
				</h3>

				<p v-if="item.description" class="text-md md:text-lg text-black/80 leading-relaxed mb-sm md:mb-md">
					{{ item.description }}
				</p>
			</div>
			<ul v-if="item.subservices?.length" class="space-y-xs w-full">
				<li
					v-for="sub in item.subservices"
					:key="sub.id"
					class="flex items-center justify-center text-xs font-medium text-black/80">
					<span>{{ sub.title }}</span>
				</li>
			</ul>
		</div>
	</Card>
</template>
