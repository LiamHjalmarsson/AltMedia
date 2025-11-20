<script setup lang="ts">
import type { Question } from "~/types";

const props = defineProps<{ question: Question }>();

const store = useBuildProjectStore();

const { formData, stepValidationErrors } = storeToRefs(store);

const showConditional = computed(() => {
	const trigger = props.question.conditional?.trigger_value;

	if (trigger === undefined) {
		return false;
	}

	const value = formData.value[props.question.title];

	return Array.isArray(value) ? value.includes(trigger) : value === trigger;
});

function updateValue(e: Event) {
	const value = (e.target as HTMLInputElement | HTMLTextAreaElement).value;

	const label = props.question.conditional?.label || props.question.conditional?.trigger_value;

	if (!label) {
		return;
	}

	store.setValue(label, value);
}

const conditionalName = computed(() => props.question.conditional?.label || "");

const errorMessage = computed(() => {
	if (!conditionalName.value) return "";

	return stepValidationErrors.value[conditionalName.value];
});
</script>

<template>
	<div class="space-y-xl">
		<div v-if="showConditional" class="mt-lg">
			<FormField :label="question.conditional?.label" :name="question.conditional?.label" :error="errorMessage">
				<Input
					v-if="['input', 'url'].includes(question.conditional?.type || '')"
					:name="question.conditional?.label"
					type="text"
					:value="formData[conditionalName] || ''"
					@input="updateValue"
					:placeholder="question.conditional?.placeholder || ''" />
				<Textarea
					v-else-if="question.conditional?.type === 'textarea'"
					rows="5"
					:name="question.conditional?.label"
					@input="updateValue"
					:placeholder="question.conditional?.placeholder || ''" />
			</FormField>
		</div>
	</div>
</template>
