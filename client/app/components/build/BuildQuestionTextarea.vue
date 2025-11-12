<script setup lang="ts">
import type { Question } from "~/types";

const props = defineProps<{ question: Question }>();

const store = useBuildProjectStore();

const { formData } = storeToRefs(store);

function onInput(e: Event) {
	const value = (e.target as HTMLTextAreaElement).value;

	store.setValue(props.question.title, value);
}
</script>

<template>
	<FormField :label="question.title" :name="question.title">
		<Textarea
			rows="5"
			:name="question.title"
			:value="formData[question.title] || ''"
			@input="onInput"
			:placeholder="question.help_text || ''" />
	</FormField>
</template>
