<script setup lang="ts">
import type { Step } from "~/types";

defineProps<{
	step: Step;
	isOnLastStep: boolean;
}>();

const store = useBuildProjectStore();

const { stepErrors } = storeToRefs(store);
</script>

<template>
	<div class="space-y-xl">
		<div v-for="question in step.questions" :key="question.id">
			<fieldset>
				<div class="mb-md">
					<legend class="font-semibold text-lg">{{ question.title }}</legend>

					<p v-if="question.help_text" class="text-black/80 text-sm mt-2xs">{{ question.help_text }}</p>
				</div>

				<BuildQuestionBoolean v-if="question.type === 'boolean'" :question="question" />

				<BuildQuestionOptions v-else-if="question.type === 'single'" :question="question" />

				<BuildQuestionInput v-else-if="question.type === 'input'" :question="question" />

				<BuildQuestionConditional v-if="question.conditional" :question="question" />

				<div v-if="Object.keys(stepErrors).length" role="alert" class="mt-md text-error text-sm space-y-2">
					<p v-for="(msg, field) in stepErrors" :key="field">{{ msg }}</p>
				</div>
			</fieldset>
		</div>
	</div>
</template>
