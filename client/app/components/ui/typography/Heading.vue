<script setup lang="ts">
import type { Heading } from "~/types";

const props = withDefaults(defineProps<Heading>(), {
	align_content: "left",
	tag: "h2",
	has_link: false,
});

const alignClass = computed(() => {
	const align = props.align_content || "left";

	switch (align) {
		case "center":
			return "text-center";
		case "right":
			return "text-right";
		default:
			return "text-left";
	}
});
</script>

<template>
	<div :class="[alignClass, has_link ? 'flex justify-between items-center w-full space-x-lg' : '']">
		<div class="flex-2 grow">
			<component
				:is="props.tag"
				class="text-heading-xl md:text-heading-2xl lg:text-heading-3xl xl:text-heading-4xl font-bold">
				{{ props.title }}
			</component>

			<p v-if="description" class="text-heading-md mt-lg tracking-tight">
				{{ description }}
			</p>
		</div>

		<ButtonLink
			v-if="has_link && link?.url"
			:url="link.url"
			:label="link.label"
			:variant="link.variant"
			:size="link.size || 'md'"
			:icon="link?.icon || 'material-symbols:arrow-forward'"
			class="max-lg:hidden w-fit shrink" />
	</div>
</template>
