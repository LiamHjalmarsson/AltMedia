<script lang="ts" setup>
import type { Form } from "~/types/shared";

const props = defineProps<{
	form: Form;
}>();

const emit = defineEmits(["update:modelValue"]);

const gridStyle = computed(() => ({
	gridTemplateColumns: `repeat(${props.form.columns}, minmax(0, 1fr))`,
}));

function onSubmit(event: Event) {
	event.preventDefault();

	const formEl = event.target as HTMLFormElement;

	const formData = new FormData(formEl);

	emit("update:modelValue", Object.fromEntries(formData.entries()));
}
</script>

<template>
	<form @submit="onSubmit" class="grid gap-lg" :style="gridStyle">
		<FormField
			v-for="input in form.inputs"
			:key="input.name"
			:label="input.label"
			:style="{ gridColumn: `span ${getGridSpan(input.column_span, form.columns)}` }">
			<Input
				v-if="input.type === 'input'"
				:id="input.name"
				:name="input.name"
				:type="input.input_type || 'text'"
				:placeholder="input.placeholder"
				:required="input.required" />

			<Textarea
				v-else-if="input.type === 'textarea'"
				:id="input.name"
				:name="input.name"
				:rows="input.rows || 3"
				:placeholder="input.placeholder"
				:required="input.required" />

			<Select v-else-if="input.type === 'select'" :id="input.name" :name="input.name">
				<SelectOption v-for="opt in input.options || []" :key="opt" :value="opt">
					{{ opt }}
				</SelectOption>
			</Select>
		</FormField>

		<div :style="{ gridColumn: '1 / -1' }" class="ml-auto mt-xl">
			<Button :type="form.button?.type || 'submit'" :variant="form.button?.variant || 'primary'">
				{{ form.button?.label || "Skicka" }}
			</Button>
		</div>
	</form>
</template>
