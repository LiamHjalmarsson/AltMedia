<script setup lang="ts">
import type { UiStepComponent } from "~/types/components/buildProject/step";

const props = defineProps<{ step: UiStepComponent }>();

const store = useBuildProjectStore();

const { formData } = storeToRefs(store);

const allItems = computed(() => [...(props.step.services || []), ...(props.step.subservices || [])]);

const isClickable = computed(() => props.step.clickable_relations);

function onToggle(title: string) {
	if (!isClickable.value) return;

	store.toggleOption(props.step.title, title);
}

function isSelected(title: string) {
	const val = formData.value[props.step.title];

	return Array.isArray(val) ? val.includes(title) : val === title;
}

function relationClass(title: string) {
	if (!isClickable.value) {
		return "border-black/10 bg-gray/10 text-black/80 cursor-default select-none";
	}

	return isSelected(title)
		? "bg-primary text-white border-primary"
		: "hover:bg-primary/10 hover:border-primary hover:text-primary border-black/10";
}
</script>

<template>
	<div>
		<div class="grid grid-cols-2 md:grid-cols-3 gap-lg lg:gap-xl">
			<button
				v-for="item in allItems"
				:key="item.id"
				@click="onToggle(item.title)"
				type="button"
				:disabled="!isClickable"
				:aria-pressed="isSelected(item.title)"
				:aria-disabled="!isClickable"
				class="border shadow-md px-sm lg:px-3xl py-sm text-center text-xs lg:text-lg font-semibold transition-all duration-150 select-none"
				:class="relationClass(item.title)">
				{{ item.title }}
			</button>
		</div>
	</div>
</template>
