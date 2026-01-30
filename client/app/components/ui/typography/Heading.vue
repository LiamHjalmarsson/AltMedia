<script setup lang="ts">
import type { Heading } from "~/types";

const props = withDefaults(defineProps<Heading>(), {
	align_content: "left",
	tag: "h2",
	has_link: false,
});

const textAlignment = computed(() => {
	switch (props.align_content) {
		case "center":
			return {
				wrapper: "text-center",
				content: "items-center",
			};
		case "right":
			return {
				wrapper: "text-right",
				content: "items-end",
			};
		default:
			return {
				wrapper: "text-left",
				content: "items-start",
			};
	}
});
</script>

<template>
	<div :class="[textAlignment.wrapper, has_link ? 'flex justify-between items-center w-full gap-lg' : '']">
		<div class="flex-2 grow flex flex-col" :class="[textAlignment.content]">
			<component
				:is="props.tag"
				class="text-heading-xl md:text-heading-2xl lg:text-heading-3xl xl:text-heading-4xl font-bold">
				{{ props.title }}
			</component>

			<p
				v-if="props.description"
				class="text-heading-sm lg:text-heading-md mt-md lg:mt-lg font-medium leading-[1.25] max-w-[850px]">
				{{ props.description }}
			</p>
		</div>

		<ButtonLink
			v-if="props.has_link && props.link?.url"
			:url="props.link.url"
			:label="props.link.label"
			:variant="props.link.variant"
			:size="props.link.size || 'md'"
			:icon="props.link.icon || 'material-symbols:arrow-forward'"
			class="max-lg:hidden w-fit shrink" />
	</div>
</template>
