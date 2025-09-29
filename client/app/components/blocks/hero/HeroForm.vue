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
	<div class="flex justify-end items-center relative max-lg:hidden">
		<div
			class="absolute -top-6 left-1/2 w-[600px] h-[600px] -translate-x-1/2 rounded-full opacity-50 blur-3xl gradient-ring" />

		<div class="w-full rounded-2xl p-xs border border-light/10 overflow-hidden sm:w-[480px] max-lg:hidden">
			<div
				class="rounded-xl border border-light/10 bg-light/10 p-lg shadow-xxl backdrop-blur-lg backdrop-saturate-100 h-full">
				<h2 class="text-heading-md text-light font-bold">
					{{ form.title }}
				</h2>

				<p class="my-md text-md text-light-gray">
					{{ form.description }}
				</p>

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
							:required="input.required" />
					</FormField>

					<div :style="{ gridColumn: '1 / -1' }">
						<Button type="submit">
							{{ form.button?.label }}
						</Button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
