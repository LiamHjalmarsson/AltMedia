<script lang="ts" setup>
import type { Form } from "~/types/shared";

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
		<div class="w-full p-xs border border-light/10 overflow-hidden">
			<div class="border border-light/10 bg-light/10 p-lg shadow-2xl backdrop-blur-lg h-full">
				<h2 class="text-heading-lg text-light font-bold">{{ form.title }}</h2>

				<p class="my-md text-md text-light-gray">{{ form.description }}</p>

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
							:placeholder="input.placeholder"
							:required="input.required"
							class="border-transparent" />
					</FormField>

					<div :style="{ gridColumn: '1 / -1' }">
						<Button
							type="submit"
							:label="form.button?.label"
							:icon="form.button.icon"
							:variant="form.button.variant" />
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
