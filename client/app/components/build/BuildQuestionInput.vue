<script setup lang="ts">
import type { Question } from "~/types";

const props = defineProps<{ question: Question }>();

props.question.input;

const store = useBuildProjectStore();

const { formData } = storeToRefs(store);

function onInput(e: Event) {
	const value = (e.target as HTMLInputElement).value;

	store.setValue(props.question.input?.name || "", value);
}
</script>

<template>
	<FormField :label="question.input?.label" :name="question.input?.name">
		<Input
			v-if="question.input?.type === 'input'"
			:id="question.input.name"
			:name="question.input.name"
			:value="formData[question.input.name] || ''"
			@input="onInput"
			:required="question.input.required"
			:type="question.input.input_type"
			:placeholder="question.input.placeholder || ''" />

		<Textarea
			v-if="question.input?.type === 'textarea'"
			:id="question.input.name"
			:rows="question.input.rows"
			:required="question.input.required"
			:name="question.input.name"
			:value="formData[question.input.name] || ''"
			@input="onInput"
			:placeholder="question.input.placeholder || ''" />
	</FormField>
</template>
