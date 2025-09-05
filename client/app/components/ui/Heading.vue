<script setup lang="ts">
import type { Heading } from "~/types/shared";

const { alignContent } = defineProps<Heading>();

const alignClass = computed(() => {
	if (alignContent === "center") {
		return "text-center";
	}

	if (alignContent === "right") {
		return "text-right";
	}

	return "text-left";
});
</script>

<template>
	<div :class="['', alignClass]">
		<h2
			class="text-heading-lg md:text-heading-xl lg:text-heading-2xl xl:text-heading-3xl 2xl:text-heading-4xl font-semibold tracking-tight font-heading">
			{{ title }}
		</h2>
	</div>
</template>
