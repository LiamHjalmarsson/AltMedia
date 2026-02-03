<script setup lang="ts">
import type { UiQuestionComponent } from "~/types/components/buildProject/question";

const props = defineProps<{ question: UiQuestionComponent }>();

const store = useBuildProjectStore();

const { buildProjectFormData, activeStepValidationErrors } = storeToRefs(store);

function handleUpdate(val: string | number) {
	const key = store.getFormFieldKeyFromQuestion(props.question);

	store.setFormFieldValue(key, val as string);
}

const key = props.question.input?.name || props.question.title;

const errorMessage = computed(() => activeStepValidationErrors.value[key]);
</script>

<template>
	<FormControl
		v-if="question.input"
		:model-value="buildProjectFormData[key]"
		@update:modelValue="handleUpdate"
		:label="question.input.label"
		:name="key"
		:type="question.input.type === 'textarea' ? 'textarea' : 'text'"
		:placeholder="question.input.placeholder"
		:required="question.input.required"
		:rows="question.input.rows"
		:error="errorMessage" />
</template>
