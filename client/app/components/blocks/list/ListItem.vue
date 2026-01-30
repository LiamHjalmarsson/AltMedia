<script setup lang="ts">
import type { ListItem } from "~/types";

interface Item {
	item: ListItem;
	index: number;
	showNumbers: boolean;
}

const props = defineProps<Item>();

const isEvenRow = computed(() => (props.index + 1) % 2 === 0);
</script>

<template>
	<li class="grid lg:grid-cols-2 lg:gap-4xl items-center group">
		<div :class="['hidden lg:block ', isEvenRow ? 'order-2' : 'order-1']">
			<ListItemImage v-if="item.image" :image="item.image" :title="item.title" />
		</div>

		<div class="relative flex flex-col justify-center h-full" :class="[isEvenRow ? 'lg:order-1' : 'lg:order-2']">
			<ListItemImage v-if="item.image" :image="item.image" :title="item.title" class="lg:hidden" />

			<div class="lg:p-md text-center lg:text-left">
				<div class="lg:flex flex-col max-lg:flex-wrap lg:justify-start lg:space-x-lg mb-sm lg:mb-md">
					<span v-if="showNumbers" class="text-heading-xl lg:text-heading-2xl font-extrabold font-heading">
						{{ (index + 1).toString().padStart(2, "0") }}
					</span>

					<h3 class="text-heading-lg md:text-heading-xl font-semibold tracking-tighter">
						{{ item.title }}
					</h3>
				</div>

				<div class="space-y-md">
					<StrapiBlocksText v-if="item.content?.length" :nodes="item.content" />
				</div>
			</div>
		</div>
	</li>
</template>
