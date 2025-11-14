<script lang="ts" setup>
import type { Form } from "~/types";

const emit = defineEmits(["submit"]);

const { form } = defineProps<{ form: Form }>();

const gridStyle = computed(() => ({
	gridTemplateColumns: `repeat(${form.columns}, minmax(0, 1fr))`,
}));

function onSubmit(event: Event) {
	event.preventDefault();

	emit("submit");
}
</script>

<template>
	<div class="flex justify-end items-center relative max-lg:hidden min-w-[400px]">
		<div class="w-full p-xs border border-white/10 overflow-hidden">
			<div class="border border-white/10 bg-white/10 p-lg shadow-2xl backdrop-blur-lg h-full">
				<h2 class="text-heading-lg text-white font-bold mb-md">{{ form.title }}</h2>

				<p class="mb-xl text-md text-white">{{ form.description }}</p>

				<form @submit="onSubmit" class="grid space-y-xl" :style="gridStyle">
					<FormField
						v-for="input in form.inputs"
						:key="input.name"
						:name="input.name"
						:label="input.label"
						:style="{ gridColumn: `span ${getGridSpan(input.column_span, form.columns)}` }">
						<Input
							v-if="input.type === 'input'"
							:id="input.name"
							:name="input.name"
							:placeholder="input.placeholder"
							:required="input.required"
							:type="input.input_type"
							class="border-transparent" />
					</FormField>

					<div class="mt-lg" :style="{ gridColumn: '1 / -1' }">
						<Button
							type="submit"
							:label="form.button?.label"
							:icon="form.button.icon"
							:size="form.button.size || 'md'"
							:variant="form.button.variant" />
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
