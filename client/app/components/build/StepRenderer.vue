<script setup lang="ts">
import type { Step } from "~/types";

const props = defineProps<{
	step: Step | null;
	isLastStep: boolean;
}>();

const isRelationsStep = computed(() => props.step?.type === "relations");
</script>

<template>
	<div ref="containerRef" class="min-h-[400px]">
		<div v-if="!step" />

		<StepRelations v-else-if="isRelationsStep" :step="step" />

		<StepQuestions v-else :step="step" :isLastStep="isLastStep" />
	</div>
</template>
