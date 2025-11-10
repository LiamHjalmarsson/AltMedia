<script setup lang="ts">
defineProps<{
	label: string;
	options: string[];
	modelValue?: string[];
}>();

const emit = defineEmits(["update:modelValue", "toggle"]);

function handleToggle(option: string) {
	emit("toggle", option);
}
</script>

<template>
	<div class="flex flex-wrap gap-lg">
		<div
			v-for="option in options"
			:key="option"
			@click="handleToggle(option)"
			class="cursor-pointer border border-gray px-3xl py-xs font-semibold transition select-none"
			:class="[
				modelValue?.includes(option) ? 'bg-primary text-white' : 'hover:border-primary hover:text-primary',
			]">
			{{ option }}
		</div>
	</div>
</template>
