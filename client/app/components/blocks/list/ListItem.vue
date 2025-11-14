<script setup lang="ts">
import type { ListItem } from "~/types";

interface Item {
	item: ListItem;
	index: number;
	showNumbers: boolean;
}

const props = defineProps<Item>();

const isEven = computed(() => (props.index + 1) % 2 === 0);

const colorClass = computed(() => {
	const color = props.item.color;

	if (!color) {
		return "";
	}

	if (color.hex) {
		return {
			color: color.hex,
		};
	}

	switch (color.type) {
		case "primary":
			return { color: "var(--color-primary)" };
		case "secondary":
			return { color: "var(--color-secondary)" };
		default:
			return { color: "var(--color-primary)" };
	}
});

const textThemeClass = computed(() => {
	const color = props.item.color;

	if (!color) {
		return "";
	}

	return color.theme === "dark" ? "text-dark" : "text-light";
});
</script>

<template>
	<li class="grid lg:grid-cols-2 lg:gap-3xl items-center group">
		<ListItemImage
			v-if="item.image"
			:image="item.image"
			:title="item.title"
			:class="['hidden lg:block', isEven ? 'order-2' : 'order-1']" />

		<div
			class="relative flex flex-col justify-center max-lg:bg-white/5 max-lg:shadow-2xl max-lg:backdrop-blur-md h-full"
			:class="[isEven ? 'lg:order-1' : 'lg:order-2', textThemeClass]">
			<ListItemImage v-if="item.image" :image="item.image" :title="item.title" class="lg:hidden" />

			<div class="pb-xl px-xl lg:p-md text-center lg:text-left space-y-md">
				<div class="flex items-center justify-center lg:justify-start space-x-md">
					<span
						v-if="showNumbers"
						class="text-heading-xl lg:text-heading-2xl font-extrabold font-heading"
						:style="colorClass">
						{{ (index + 1).toString().padStart(2, "0") }}
					</span>

					<h3 class="text-heading-md lg:text-heading-lg font-semibold leading-wide">
						{{ item.title }}
					</h3>
				</div>

				<StrapiBlocksText v-if="item.content?.length" :nodes="item.content" />
			</div>
		</div>
	</li>
</template>
