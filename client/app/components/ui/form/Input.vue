<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

defineProps<{ modelValue?: string | number }>();

function handleInput(event: Event) {
	const target = event.target as HTMLInputElement;

	if (!target) {
		return;
	}

	emit("update:modelValue", target.value);
}
</script>

<template>
	<input
		v-bind="$attrs"
		:value="modelValue"
		@input="handleInput"
		:arial-label="$attrs['aria-label'] || $attrs.placeholder || $attrs.name"
		:class="[
			'w-full py-xs px-sm rounded-lg outline-none backdrop-blur-lg transition shadow-xl border-light/5 border  focus-visible:outline-primary',
		]" />
</template>
