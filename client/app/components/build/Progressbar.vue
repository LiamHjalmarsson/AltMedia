<script setup lang="ts">
import type { UiStepComponent } from "~/types/components/buildProject/step";

const props = defineProps<{
	steps: UiStepComponent[];
	activeStepIndex: number;
	progress: number;
}>();

const totalSteps = computed(() => props.steps.length);
</script>

<template>
	<div
		v-if="steps.length"
		role="progressbar"
		:aria-valuemin="1"
		:aria-valuemax="totalSteps"
		:aria-valuenow="activeStepIndex"
		class="relative mb-sm md:mb-lg lg:mb-xl">
		<div
			aria-hidden="true"
			class="absolute top-1/2 left-0 w-full h-[4px] bg-black/20 -translate-y-1/2 rounded-full" />

		<div
			aria-hidden="true"
			class="absolute top-1/2 left-0 h-2 md:h-[9px] lg:h-[10px] bg-primary rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] -translate-y-1/2"
			:style="{ width: progress + '%' }" />

		<ol class="relative flex justify-between">
			<li
				v-for="(step, i) in steps"
				:key="step.id || i"
				class="flex flex-col items-center text-center w-full mb-lg">
				<div
					class="text-xs md:text-sm lg:text-md font-semibold w-8 md:w-9 lg:w-10 h-8 md:h-9 lg:h-10 flex items-center justify-center rounded-full border transition-all duration-500"
					:class="[
						i + 1 <= activeStepIndex
							? 'bg-primary border-primary text-white'
							: 'border-black/80 text-black/80',
					]">
					{{ i + 1 }}
				</div>

				<p
					class="text-xs md:text-sm lg:text-md leading-tight max-w-[80px] mt-lg"
					:class="i + 1 === activeStepIndex ? 'text-primary font-semibold' : 'text-black/80'">
					{{ step.subtitle }}
				</p>
			</li>
		</ol>
	</div>
</template>
