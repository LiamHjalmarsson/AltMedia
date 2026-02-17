<script setup lang="ts">
import type { UiHeadingComponent } from "~/types/components/ui/heading";

const props = withDefaults(defineProps<UiHeadingComponent>(), {
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
	<div :class="[textAlignment.wrapper, has_link ? 'flex justify-between items-center w-full space-x-lg' : '']">
		<div class="flex-2 grow flex flex-col" :class="[textAlignment.content]">
			<component
				:is="props.tag"
				class="text-heading-lg sm:text-heading-xl md:text-heading-2xl lg:text-heading-3xl xl:text-heading-4xl font-bold max-w-[850px]">
				{{ props.title }}
			</component>
			<p
				v-if="props.description"
				class="text-xl md:text-2xl lg:text-4xl max-w-[950px] font-normal mt-sm md:mt-md lg:mt-lg">
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
