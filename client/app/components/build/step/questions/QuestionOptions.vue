<script setup lang="ts">
import type { UiQuestionComponent } from "~/types/components/buildProject/question";

const props = defineProps<{ question: UiQuestionComponent }>();

const store = useBuildProjectStore();

const { buildProjectFormData, activeStepValidationErrors } = storeToRefs(store);

function onToggle(option: string) {
	store.toggleQuestionOptionValue(props.question.title, option);
}

function isSelected(option: string) {
	const value = buildProjectFormData.value[props.question.title];

	return Array.isArray(value) ? value.includes(option) : value === option;
}

const errorMessage = computed(() => activeStepValidationErrors.value[props.question.title]);
</script>

<template>
	<div class="space-y-xl">
		<div class="flex flex-wrap gap-lg lg:gap-xl">
			<button
				v-for="option in props.question.options || []"
				:key="option.label"
				type="button"
				@click="onToggle(option.label)"
				:aria-pressed="isSelected(option.label)"
				class="cursor-pointer border border-black/10 shadow-xl px-sm lg:px-3xl py-md text-xs lg:text-lg font-semibold transition select-none rounded-xl"
				:class="
					isSelected(option.label)
						? 'bg-primary text-white border-primary'
						: 'hover:border-primary hover:text-primary'
				">
				{{ option.label }}
			</button>
		</div>

		<p v-if="errorMessage" class="text-error text-sm">{{ errorMessage }}</p>
	</div>
</template>
