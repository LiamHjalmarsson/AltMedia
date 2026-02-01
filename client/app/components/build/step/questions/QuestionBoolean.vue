<script setup lang="ts">
import type { UiQuestionComponent } from "~/types/components/buildProject/question";

const props = defineProps<{ question: UiQuestionComponent }>();

const store = useBuildProjectStore();

const { formData, stepValidationErrors } = storeToRefs(store);

const options = ["Ja", "Nej"];

function onSelect(option: string) {
	store.setValue(props.question.title, option);
}

function isSelected(option: string) {
	return formData.value[props.question.title] === option;
}

const errorMessage = computed(() => stepValidationErrors.value[props.question.title]);
</script>

<template>
	<div class="space-y-lg">
		<div class="flex gap-lg lg:gap-xl">
			<button
				v-for="option in options"
				:key="option"
				type="button"
				@click="onSelect(option)"
				:aria-pressed="isSelected(option)"
				class="cursor-pointer border border-black/10 shadow-lg px-xl lg:px-xl py-sm font-semibold text-md lg:text-lg transition select-none"
				:class="
					isSelected(option)
						? 'bg-primary text-white border-primary'
						: 'hover:border-primary hover:text-primary'
				">
				{{ option }}
			</button>
		</div>

		<p v-if="errorMessage" class="text-error text-sm">{{ errorMessage }}</p>
	</div>
</template>
