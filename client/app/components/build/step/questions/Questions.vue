<script setup lang="ts">
import type { UiStepComponent } from "~/types/components/buildProject/step";

const props = defineProps<{
	step: UiStepComponent;
	isLastStep: boolean;
}>();
</script>

<template>
	<div :class="[isLastStep ? 'grid grid-cols-1 md:grid-cols-2 gap-lg lg:gap-2xl' : ' space-y-lg lg:space-y-2xl']">
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
					<legend class="font-semibold text-lg">
						{{ question.title }} <span v-if="question.required" class="text-primary">*</span>
					</legend>

					<p v-if="question.help_text" class="text-black/80 text-sm mt-xs">
						{{ question.help_text }}
					</p>
				</div>

				<div class="space-y-md">
					<QuestionBoolean v-if="question.type === 'boolean'" :question />

					<QuestionOptions v-else-if="question.type === 'single'" :question />

					<QuestionInput v-else-if="question.type === 'input'" :question />

					<QuestionConditional v-if="question.conditional" :question />
				</div>
			</fieldset>
		</div>
	</div>
</template>
