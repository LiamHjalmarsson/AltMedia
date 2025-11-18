<script setup lang="ts">
import type { Question } from "~/types";

const props = defineProps<{ question: Question }>();

const store = useBuildProjectStore();

const { formData } = storeToRefs(store);

const showConditional = computed(() => {
	const trigger = props.question.conditional?.trigger_value;

	if (trigger === undefined) {
		return false;
	}

	const value = formData.value[props.question.title];

	return Array.isArray(value) ? value.includes(trigger) : value === trigger;
});

function onInput(e: Event) {
	const val = (e.target as HTMLInputElement | HTMLTextAreaElement).value;

	const label = props.question.conditional?.label || props.question.conditional?.trigger_value;

	if (!label) {
		return;
	}

	store.setValue(label, val);
}
</script>

<template>
	<div v-if="showConditional" class="mt-lg">
		<FormField :label="question.conditional?.label" :name="question.conditional?.label">
			<Input
				v-if="['input', 'url'].includes(question.conditional?.type || '')"
				:name="question.conditional?.label"
				@input="onInput"
				type="text"
				:placeholder="question.conditional?.placeholder || ''" />
			<Textarea
				v-else-if="question.conditional?.type === 'textarea'"
				rows="2"
				:name="question.conditional?.label"
				@input="onInput"
				:placeholder="question.conditional?.placeholder || ''" />
		</FormField>
	</div>
</template>
