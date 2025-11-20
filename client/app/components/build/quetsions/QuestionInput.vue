<script setup lang="ts">
import type { Question } from "~/types";

const props = defineProps<{ question: Question }>();

const store = useBuildProjectStore();

const { formData, stepValidationErrors } = storeToRefs(store);

function onInput(e: Event) {
	const value = (e.target as HTMLInputElement).value;

	store.setValue(props.question.input?.name || "", value);
}

const errorMessage = computed(() => stepValidationErrors.value[props.question.input?.name || ""]);
</script>

<template>
	<div class="space-y-sm">
		<FormField :label="question.input?.label" :name="question.input?.name" :error="errorMessage">
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
				:rows="question.input.rows || 5"
				:name="question.input.name"
				:value="formData[question.input.name] || ''"
				@input="onInput"
				:placeholder="question.input.placeholder || ''" />
		</FormField>
	</div>
</template>
