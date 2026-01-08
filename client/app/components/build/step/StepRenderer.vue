<script setup lang="ts">
import type { Step } from "~/types";

const props = defineProps<{
	step: Step | null;
	isLastStep: boolean;
}>();

const isRelationsStep = computed(() => props.step?.type === "relations");
</script>

<template>
	<div v-if="!step" />

	<Relations v-else-if="isRelationsStep" :step="step" />

	<Questions v-else :step="step" :isLastStep="isLastStep" />
</template>
