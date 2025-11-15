<script setup lang="ts">
import type { Step } from "~/types";

defineProps<{
	steps: Step[];
	activeStepIndex: number;
	progress: number;
}>();
</script>

<template>
	<div class="relative mb-sm md:mb-lg lg:mb-xl" v-if="steps.length">
		<div class="absolute top-1/2 left-0 w-full h-[4px] bg-black/20 -translate-y-1/2 rounded-full" />

		<div
			class="absolute top-1/2 left-0 h-2 md:h-[9px] lg:h-[10px] bg-primary rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] -translate-y-1/2"
			:style="{ width: `${progress}%` }" />

		<div class="relative flex justify-between">
			<div v-for="(step, i) in steps" :key="step.id" class="flex flex-col items-center text-center w-full mb-lg">
				<div
					class="w-8 md:w-9 lg:w-10 h-8 md:h-9 lg:h-10 flex items-center justify-center rounded-full border transition-all duration-500"
					:class="[
						i + 1 <= activeStepIndex
							? 'bg-primary border-primary text-white'
							: 'border-black/80 text-black/80',
					]">
					<span class="test-xs md:text-sm lg:text-md font-semibold">{{ i + 1 }}</span>
				</div>

				<p
					class="test-xs md:text-sm lg:text-md leading-tight max-w-[80px] mt-lg"
					:class="i + 1 === activeStepIndex ? 'text-primary font-semibold' : 'text-black/80'">
					{{ step.subtitle }}
				</p>
			</div>
		</div>
	</div>
</template>
