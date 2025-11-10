<script setup lang="ts">
defineProps<{
	label: string;
	modelValue?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const options = ["Ja", "Nej"];

function select(option: string) {
	emit("update:modelValue", option);
}
</script>

<template>
	<div class="flex gap-md">
		<div
			v-for="option in options"
			:key="option"
			@click="select(option)"
			class="cursor-pointer border border-gray px-3xl py-xs font-semibold select-none transition"
			:class="[
				modelValue === option
					? 'bg-primary text-white border-primary'
					: 'hover:border-primary hover:text-primary',
			]">
			{{ option }}
		</div>
	</div>
</template>
