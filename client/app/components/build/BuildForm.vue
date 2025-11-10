<script setup lang="ts">
import type { Step } from "~/types";

defineProps<{
	currentStep: Step;
	isOnLastStep: boolean;
}>();

const buildStore = useBuildProjectStore();

const { formData, toggleOption } = buildStore;
</script>

<template>
	<div class="space-y-xl">
		<ContactInformation v-if="isOnLastStep" v-model="formData" />

		<form v-else class="space-y-xl min-h-[250px]">
			<div v-for="question in currentStep.questions" :key="question.id" class="space-y-md">
				<label class="block font-medium text-black/80 text-lg">{{ question.label }}</label>

				<QuestionBoolean
					v-if="question.type === 'boolean'"
					:label="question.label"
					v-model="formData[question.label]" />

				<QuestionMulti
					v-else-if="question.type === 'multi'"
					:label="question.label"
					:options="question.options"
					v-model="formData[question.label]"
					@toggle="(option: string) => toggleOption(question.label, option)" />

				<QuestionStatic v-else-if="question.type === 'static'" :options="question.options" />

				<QuestionBudgetTime
					v-else-if="question.type === 'budget' || question.type === 'time'"
					:label="question.label"
					:options="question.options"
					v-model="formData" />

				<Textarea
					v-else-if="question.type === 'text'"
					v-model="formData[question.label]"
					placeholder="Skriv din kommentar här..."
					rows="4" />

				<Input
					v-else-if="question.type === 'input'"
					v-model="formData[question.label]"
					:placeholder="question.label" />
			</div>
		</form>
	</div>
</template>
