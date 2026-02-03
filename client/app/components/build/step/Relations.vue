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
		return "border-black/10 bg-gray/10 text-black/80 select-none cursor-default";
	}

	return isSelected(title)
		? "bg-primary text-white border-primary cursor-pointer"
		: "hover:bg-primary/10 hover:border-primary hover:text-primary border-black/10 cursor-pointer";
}
</script>

<template>
	<div>
		<div class="grid grid-cols-2 lg:grid-cols-3 gap-xl lg:gap-2xl">
			<button
				v-for="item in allItems"
				:key="item.id"
				@click="onToggle(item.title)"
				type="button"
				:disabled="!isClickable"
				:aria-pressed="isSelected(item.title)"
				:aria-disabled="!isClickable"
				class="border shadow-md px-sm lg:px-´2xl py-md text-center text-2xs md:text-xs lg:text-md text-black/80 font-semibold transition-all duration-150 select-none lg:min-w-44 rounded-xl"
				:class="relationClass(item.title)">
				{{ item.title }}
			</button>
		</div>
	</div>
</template>
