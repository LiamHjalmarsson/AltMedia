<script setup lang="ts">
import type { Question } from "~/types";

const props = defineProps<{ question: Question }>();

const store = useBuildProjectStore();

const { formData } = storeToRefs(store);

function onSelect(option: string) {
	store.setValue(props.question.title, option);
}

function isSelected(option: string) {
	return formData.value[props.question.title] === option;
}
</script>

<template>
	<div class="flex gap-lg lg:gap-xl">
		<div
			v-for="option in ['Ja', 'Nej']"
			:key="option"
			@click="onSelect(option)"
			class="cursor-pointer border border-dark/10 shadow-lg px-xl lg:px-3xl py-sm font-semibold text-md lg:text-lg transition select-none"
			:class="
				isSelected(option) ? 'bg-primary text-white border-primary' : 'hover:border-primary hover:text-primary'
			">
			{{ option }}
		</div>
	</div>
</template>
