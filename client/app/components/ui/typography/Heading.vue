<script setup lang="ts">
import type { Heading } from "~/types";

const props = withDefaults(defineProps<Heading>(), {
	align_content: "left",
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
	<div :class="[alignClass, has_link ? 'flex justify-between items-center w-full' : '']">
		<div class="flex-2 grow">
			<div>
				<h2
					class="text-heading-lg md:text-heading-xl lg:text-heading-2xl xl:text-heading-3xl font-bold tracking-tight">
					{{ title }}
				</h2>

				<p v-if="description" class="text-xl font-medium mt-sm">
					{{ description }}
				</p>
			</div>
		</div>

		<ButtonLink
			v-if="has_link && link?.url"
			:url="link.url"
			:label="link.label"
			:variant="link.variant"
			:size="link.size || 'lg'"
			:icon="link?.icon || 'material-symbols:arrow-forward'"
			class="max-lg:hidden w-fit shrink" />
	</div>
</template>
