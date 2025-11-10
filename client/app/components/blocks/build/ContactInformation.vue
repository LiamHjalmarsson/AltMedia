<script setup lang="ts">
const props = defineProps<{
	modelValue: Record<string, string | string[] | undefined>;
}>();

const emit = defineEmits<{
	(e: "update:modelValue", value: Record<string, string | string[] | undefined>): void;
}>();

function onInput(e: Event, key: string) {
	const target = e.target as HTMLInputElement | null;

	if (!target) return;

	const updated = { ...props.modelValue, [key]: target.value };

	emit("update:modelValue", updated);
}
</script>

<template>
	<div class="space-y-xl">
		<FormField label="Namn">
			<Input :value="modelValue['Namn']" @input="(e: Event) => onInput(e, 'Namn')" placeholder="Ditt namn" />
		</FormField>

		<FormField label="Telefonnummer">
			<Input
				:value="modelValue['Telefonnummer']"
				@input="(e: Event) => onInput(e, 'Telefonnummer')"
				placeholder="Ditt nummer" />
		</FormField>

		<FormField label="E-post">
			<Input :value="modelValue['E-post']" @input="(e: Event) => onInput(e, 'E-post')" placeholder="Din e-post" />
		</FormField>
	</div>
</template>
