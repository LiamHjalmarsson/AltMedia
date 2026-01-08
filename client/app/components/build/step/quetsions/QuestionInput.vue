<script setup lang="ts">
import type { Question } from "~/types";

const props = defineProps<{ question: Question }>();

const store = useBuildProjectStore();

const { formData, stepValidationErrors } = storeToRefs(store);

function handleUpdate(val: string | number) {
	const key = store.fieldKey(props.question);

	store.setValue(key, val as string);
}

const key = props.question.input?.name || props.question.title;

const errorMessage = computed(() => stepValidationErrors.value[key]);
</script>

<template>
	<FormControl
		v-if="question.input"
		:model-value="formData[key]"
		@update:modelValue="handleUpdate"
		:label="question.input.label"
		:name="key"
		:type="question.input.type === 'textarea' ? 'textarea' : 'text'"
		:placeholder="question.input.placeholder"
		:required="question.input.required"
		:rows="question.input.rows"
		:error="errorMessage" />
</template>
