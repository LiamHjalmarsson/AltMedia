<script setup lang="ts">
import type { Question } from "~/types";

const props = defineProps<{ question: Question }>();

const store = useBuildProjectStore();

const { formData } = storeToRefs(store);

function onToggle(option: string) {
	store.toggleOption(props.question.title, option);
}

function isSelected(option: string) {
	const value = formData.value[props.question.title];

	return Array.isArray(value) ? value.includes(option) : value === option;
}
</script>

<template>
	<div class="flex flex-wrap gap-lg lg:gap-xl">
		<div
			v-for="option in props.question.options || []"
			:key="option.label"
			@click="onToggle(option.label)"
			class="cursor-pointer border border-black/10 shadow-xl px-sm lg:px-3xl py-md text-xs lg:text-lg font-semibold transition select-none"
			:class="
				isSelected(option.label)
					? 'bg-primary text-white border-primary'
					: 'hover:border-primary hover:text-primary'
			">
			{{ option.label }}
		</div>
	</div>
</template>
