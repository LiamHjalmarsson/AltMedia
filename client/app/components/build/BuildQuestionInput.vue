<script setup lang="ts">
import type { Question } from "~/types";

const props = defineProps<{ question: Question }>();

const store = useBuildProjectStore();

const { formData } = storeToRefs(store);

function onInput(e: Event) {
	const value = (e.target as HTMLInputElement).value;

	store.setValue(props.question.title, value);
}
</script>

<template>
	<FormField :label="question.title" :name="question.title">
		<Input
			:value="formData[question.title] || ''"
			:name="question.title"
			@input="onInput"
			type="text"
			:placeholder="question.help_text || ''" />
	</FormField>
</template>
