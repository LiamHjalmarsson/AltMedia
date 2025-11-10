<script setup lang="ts">
import type { Step } from "~/types";

defineProps<{
	steps: Step[];
	activeStepIndex: number;
	progress: number;
}>();
</script>

<template>
	<div class="relative mb-xl" v-if="steps.length">
		<div class="absolute top-1/2 left-0 w-full h-[4px] bg-dark/20 -translate-y-1/2 rounded-full" />

		<div
			class="absolute top-1/2 left-0 h-[4px] bg-primary rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] -translate-y-1/2"
			:style="{ width: `${progress}%` }" />

		<div class="relative flex justify-between">
			<div v-for="(step, i) in steps" :key="step.id" class="flex flex-col items-center text-center w-full">
				<div
					class="w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-500 mb-xl"
					:class="[
						i + 1 <= activeStepIndex ? 'bg-primary border-primary text-white' : 'border-gray text-gray',
					]">
					<span class="text-sm font-semibold">{{ i + 1 }}</span>
				</div>

				<p
					class="text-xs leading-tight max-w-[80px]"
					:class="i + 1 === activeStepIndex ? 'text-primary font-semibold' : 'text-gray'">
					{{ step.title }}
				</p>
			</div>
		</div>
	</div>
</template>
