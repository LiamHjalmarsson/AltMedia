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
			class="absolute top-1/2 left-0 w-full h-[4px] bg-black/10 -translate-y-1/2 rounded-full" />

		<div
			aria-hidden="true"
			class="absolute top-1/2 left-0 h-2 bg-primary rounded-full transition-all duration-700 ease-in -translate-y-1/2"
			:style="{ width: progress + '%' }" />

		<ol class="relative flex justify-between">
			<li
				v-for="(step, i) in steps"
				:key="step.id || i"
				class="flex flex-col items-center text-center w-full"
				:class="[step.subtitle ? 'mb-lg' : '']">
				<div
					class="text-xs md:text-sm lg:text-md font-bold w-8 md:w-9 lg:w-10 h-8 md:h-9 lg:h-10 flex items-center justify-center rounded-full border transition-all duration-500"
					:class="[
						i + 1 <= activeStepIndex
							? 'bg-primary border-primary text-white'
							: 'border-black/40 text-black/40 hidden',
					]">
					{{ i + 1 }}
				</div>

				<p
					v-if="step.subtitle"
					class="text-xs md:text-sm lg:text-md max-w-[80px] mt-lg"
					:class="i + 1 === activeStepIndex ? 'text-primary font-semibold' : 'text-black/40'">
					{{ step.subtitle }}
				</p>
			</li>
		</ol>
	</div>
</template>
