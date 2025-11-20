<script setup lang="ts">
import type { Step } from "~/types";

defineProps<{
	step: Step;
	isLastStep: boolean;
}>();
</script>

<template>
	<div :class="[isLastStep ? 'grid grid-cols-1 md:grid-cols-2 gap-xl' : 'space-y-xl']">
		<div
			v-for="question in step.questions"
			:key="question.id"
			:class="[
				isLastStep && (question.input?.label === 'Email' || question.input?.label === 'Meddelande')
					? 'md:col-span-2'
					: '',
			]">
			<fieldset :class="[isLastStep ? 'space-y-md' : 'space-y-xl']">
				<div v-if="!isLastStep" class="mb-md">
					<legend class="font-semibold text-lg">{{ question.title }}</legend>
					<p v-if="question.help_text" class="text-black/80 text-sm mt-2xs">
						{{ question.help_text }}
					</p>
				</div>

				<QuestionBoolean v-if="question.type === 'boolean'" :question />

				<QuestionOptions v-else-if="question.type === 'single'" :question />

				<QuestionInput v-else-if="question.type === 'input'" :question />

				<QuestionConditional v-if="question.conditional" :question />
			</fieldset>
		</div>
	</div>
</template>
