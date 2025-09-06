<script lang="ts" setup>
import type { ListItem } from "~/types/content/blocks";

defineProps<{
	item: ListItem;
	number: number;
}>();
</script>

<template>
	<div class="grid grid-cols-2 gap-xxl items-center w-full group overflow-hidden">
		<div :class="number % 2 === 0 ? 'md:order-2' : 'md:order-1'">
			<div class="flex items-center">
				<span
					class="text-heading-lg sm:text-heading-xl md:text-heading-xxl lg:text-heading-xxxl xl:text-heading-xxxxl font-extrabold text-secondary mr-md lg:mr-lg font-heading">
					{{ number }}
				</span>
				<h3
					class="text-heading-sm md:text-heading-md lg:text-heading-lg xl:text-heading-xl font-semibold first-letter:capitalize truncate">
					{{ item.title }}
				</h3>
			</div>

			<StrapiBlocksText v-if="item.content?.length" :nodes="item.content || []" class="text-lg" />
		</div>

		<div :class="number % 2 === 0 ? 'md:order-1' : 'md:order-2'" class="overflow-hidden rounded-2xl">
			<NuxtImg
				v-if="item.icon && item.icon.is_image"
				:src="item.icon.image?.url"
				:alt="item.icon.image?.alternativeText || ''"
				class="w-full rounded-xl group-hover:scale-110 transition duration-300 object-cover max-h-[550px]" />
		</div>
	</div>
</template>
