<script setup lang="ts">
import type { Step } from "~/types";

const props = defineProps<{
	currentStep: Step | null;
	isOnLastStep: boolean;
}>();

const store = useBuildProjectStore();

const isRelationStep = computed(() => store.isRelationStep(props.currentStep));
</script>

<template>
	<div v-if="!currentStep" />

	<BuildStepRelations v-else-if="isRelationStep" :step="currentStep" />

	<BuildStepQuestions v-else :step="currentStep" :is-on-last-step="isOnLastStep" />
</template>
