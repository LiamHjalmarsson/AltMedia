<script setup lang="ts">
import type { Question } from "~/types";

const props = defineProps<{ question: Question }>();

const store = useBuildProjectStore();

const { formData } = storeToRefs(store);

const options = ["Ja", "Nej"];

function onSelect(option: string) {
	store.setValue(props.question.title, option);
}

function isSelected(option: string) {
	return formData.value[props.question.title] === option;
}
</script>

<template>
	<div class="flex gap-lg lg:gap-xl">
		<button
			v-for="option in options"
			:key="option"
			type="button"
			@click="onSelect(option)"
			:aria-pressed="isSelected(option)"
			class="cursor-pointer border border-black/10 shadow-lg px-xl lg:px-3xl py-sm font-semibold text-md lg:text-lg transition select-none"
			:class="
				isSelected(option) ? 'bg-primary text-white border-primary' : 'hover:border-primary hover:text-primary'
			">
			{{ option }}
		</button>
	</div>
</template>
