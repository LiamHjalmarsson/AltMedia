<script setup lang="ts">
import type { ListItem } from "~/types/content/blocks";

const { index } = defineProps<{ item: ListItem; index: number }>();

const isEven = computed(() => (index + 1) % 2 === 0);
</script>

<template>
	<li class="grid lg:grid-cols-2 gap-2xl items-center group">
		<ListItemImage
			:icon="item.icon"
			:title="item.title"
			:class="['hidden lg:block rounded-2xl', isEven ? 'order-2' : 'order-1']" />
		<div
			class="relative flex flex-col justify-center max-lg:bg-light/5 max-lg:rounded-2xl max-lg:shadow-2xl max-lg:backdrop-blur-md"
			:class="[isEven ? 'lg:order-1 lg:pr-2xl' : 'lg:order-2 lg:pl-2xl']">
			<ListItemImage :icon="item.icon" :title="item.title" class="lg:hidden rounded-t-2xl" />

			<div class="p-xl sm:p-2xl text-center lg:text-left space-y-md">
				<div class="flex items-center justify-center lg:justify-start flex-wrap space-x-md">
					<span class="text-heading-xl lg:text-heading-2xl font-extrabold text-secondary font-heading">
						{{ (index + 1).toString().padStart(2, "0") }}
					</span>

					<h3 class="text-heading-md lg:text-heading-lg font-semibold leading-tight">
						{{ item.title }}
					</h3>
				</div>

				<StrapiBlocksText
					v-if="item.content?.length"
					:nodes="item.content"
					class="text-base sm:text-lg text-light/85 leading-relaxed max-lg:text-center" />
			</div>
		</div>
	</li>
</template>
