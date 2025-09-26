<script setup lang="ts">
defineProps<{ progress: number; steps: { id: number; title: string }[]; currentStep: number }>();
</script>

<template>
	<div>
		<div class="w-full bg-light-gray/30 h-2 rounded-full">
			<div class="bg-primary h-2 rounded-full transition-all duration-500" :style="{ width: progress + '%' }" />
		</div>
		<div class="flex justify-between mt-sm text-xs text-dark-gray">
			<span
				v-for="step in steps"
				:key="step.id"
				:class="['transition font-medium', currentStep >= step.id ? 'text-primary' : 'opacity-60']">
				{{ step.title }}
			</span>
		</div>
	</div>
</template>
