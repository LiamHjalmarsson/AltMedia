<script setup lang="ts">
import type { UiQuestionComponent } from "~/types/components/buildProject/question";

const props = defineProps<{ question: UiQuestionComponent }>();

const store = useBuildProjectStore();

const { buildProjectFormData, activeStepValidationErrors } = storeToRefs(store);

const conditionalKey = computed(() => props.question.conditional?.label || `${props.question.title}_extra`);

const showConditional = computed(() => {
	const triggerValue = props.question.conditional?.trigger_value;

	const parentValue = buildProjectFormData.value[props.question.title];

	if (!triggerValue) return true;

	return Array.isArray(parentValue) ? parentValue.includes(triggerValue) : parentValue === triggerValue;
});

function handleUpdate(value: string | number) {
	store.setFormFieldValue(conditionalKey.value, value as string);
}

const errorMessage = computed(() => activeStepValidationErrors.value[conditionalKey.value]);
</script>

<template>
	<div v-if="showConditional" class="mt-lg">
		<FormControl
			:model-value="buildProjectFormData[conditionalKey]"
			@update:modelValue="handleUpdate"
			:label="question.conditional?.label"
			:name="conditionalKey"
			:type="question.conditional?.type === 'textarea' ? 'textarea' : 'text'"
			:placeholder="question.conditional?.placeholder"
			:error="errorMessage" />
	</div>
</template>
