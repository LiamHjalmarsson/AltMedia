<script setup lang="ts">
const props = defineProps<{
	label: string;
	options: string[];
	modelValue: Record<string, any>;
}>();

function setOption(value: string) {
	props.modelValue[props.label] = value;
}
</script>

<template>
	<div class="flex flex-wrap gap-lg">
		<div
			v-for="option in options"
			:key="option"
			@click="setOption(option)"
			class="cursor-pointer border border-gray px-3xl py-xs font-semibold transition select-none"
			:class="[
				modelValue[label] === option ? 'bg-primary text-white' : 'hover:border-primary hover:text-primary',
			]">
			{{ option }}
		</div>
		<Input v-model="modelValue[label + 'Egen']" placeholder="Eget värde:" class="flex-1" />
	</div>
</template>
