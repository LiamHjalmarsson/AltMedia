<script setup lang="ts">
import type { Step } from "~/types";

defineProps<{
	step: Step;
	isOnLastStep: boolean;
}>();
</script>

<template>
	<div class="space-y-xl">
		<div
			v-for="question in step.questions.filter(
				(question) => !['Namn', 'Telefon', 'Email', 'Meddelande'].includes(question.title)
			)"
			:key="question.id">
			<div class="mb-md">
				<label class="font-semibold text-lg">{{ question.title }}</label>
				<p v-if="question.help_text" class="text-dark/80 text-sm mt-2xs">{{ question.help_text }}</p>
			</div>
			<BuildQuestionBoolean v-if="question.type === 'boolean'" :question="question" />
			<BuildQuestionOptions v-else-if="['single', 'multi'].includes(question.type)" :question="question" />
			<BuildQuestionInput v-else-if="question.type === 'input'" :question="question" />
			<BuildQuestionTextarea v-else-if="question.type === 'textarea'" :question="question" />
			<BuildQuestionConditional v-if="question.conditional" :question="question" />
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-xl">
			<div
				v-for="question in step.questions.filter((question) => ['Namn', 'Telefon'].includes(question.title))"
				:key="question.id"
				class="flex flex-col gap-2">
				<BuildQuestionInput :question="question" />
			</div>
		</div>

		<div v-for="question in step.questions.filter((question) => question.title === 'Email')" :key="question.id">
			<BuildQuestionInput :question="question" />
		</div>

		<div
			v-for="question in step.questions.filter((question) => question.title === 'Meddelande')"
			:key="question.id">
			<BuildQuestionTextarea :question="question" />
		</div>
	</div>
</template>
