<script setup lang="ts">
import type { Heading } from "~/types/shared";

const { align_content } = defineProps<Heading>();

const alignClass = computed(() => {
	if (align_content === "center") {
		return "text-center";
	}

	if (align_content === "right") {
		return "text-right";
	}

	return "text-left";
});
</script>

<template>
	<div :class="alignClass">
		<h2
			class="text-heading-lg md:text-heading-xl lg:text-heading-xxl xl:text-heading-xxxl 2xl:text-heading-xxxxl font-semibold tracking-tight font-heading">
			{{ title }}
		</h2>

		<ButtonLink v-if="has_link" :to="link?.url">
			{{ link?.label }} <Icon name="material-symbols:arrow-forward" />
		</ButtonLink>
	</div>
</template>
