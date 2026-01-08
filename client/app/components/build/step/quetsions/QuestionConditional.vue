<script setup lang="ts">
import type { Question } from "~/types";

const props = defineProps<{ question: Question }>();

const store = useBuildProjectStore();

const { formData, stepValidationErrors } = storeToRefs(store);

const conditionalKey = computed(() => props.question.conditional?.label || `${props.question.title}_extra`);

const showConditional = computed(() => {
	const triggerValue = props.question.conditional?.trigger_value;

	const parentValue = formData.value[props.question.title];

	if (!triggerValue) return true;

	return Array.isArray(parentValue) ? parentValue.includes(triggerValue) : parentValue === triggerValue;
});

function handleUpdate(value: string | number) {
	store.setValue(conditionalKey.value, value as string);
}

const errorMessage = computed(() => stepValidationErrors.value[conditionalKey.value]);
</script>

<template>
	<div v-if="showConditional" class="mt-lg">
		<FormControl
			:model-value="formData[conditionalKey]"
			@update:modelValue="handleUpdate"
			:label="question.conditional?.label"
			:name="conditionalKey"
			:type="question.conditional?.type === 'textarea' ? 'textarea' : 'text'"
			:placeholder="question.conditional?.placeholder"
			:error="errorMessage" />
	</div>
</template>
