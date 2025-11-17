<script setup lang="ts">
import type { Step } from "~/types";

const props = defineProps<{ step: Step }>();

const store = useBuildProjectStore();

const { formData } = storeToRefs(store);

const isClickable = computed(() => store.isClickableRelations(props.step));

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
			<div
				v-for="service in step.services || []"
				:key="service.id"
				@click="onToggle(service.title)"
				class="border shadow-md px-sm lg:px-3xl py-sm text-center text-xs lg:text-lg font-semibold transition-all duration-150 select-none"
				:class="relationClass(service.title)">
				{{ service.title }}
			</div>

			<div
				v-for="sub in step.subservices || []"
				:key="sub.id"
				@click="onToggle(sub.title)"
				class="border shadow-md px-3xl py-sm text-center text-lg font-semibold transition-all duration-150 select-none"
				:class="relationClass(sub.title)">
				{{ sub.title }}
			</div>
		</div>
	</div>
</template>
