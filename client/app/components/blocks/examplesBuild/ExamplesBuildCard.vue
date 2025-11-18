<script setup lang="ts">
import type { BuildItem } from "~/types";

const props = defineProps<{ item: BuildItem }>();
</script>

<template>
	<article
		class="overflow-hidden border border-white/40 flex flex-col justify-between items-center p-xl relative shadow-lg transition-all duration-300 focus-visible:outline-primary h-full group">
		<NuxtImg
			v-if="item.icon?.is_image && item.icon.image?.url"
			:src="item.icon.image.url"
			:alt="item.icon.image.alternativeText || item.title"
			format="webp,avif"
			quality="85"
			width="100"
			height="100"
			loading="lazy"
			class="object-contain" />

		<IconBadge v-if="item.icon?.icon_name" :icon="item.icon" variant="primary" :size="50" />

		<div class="flex-1 text-center">
			<h3 class="font-semibold text-heading-sm md:text-heading-lg my-md">
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
				{{ sub.title }}
			</li>
		</ul>
	</article>
</template>
