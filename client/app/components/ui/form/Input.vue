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
		class="w-full py-sm px-sm backdrop-blur-lg transition outline-0 shadow-xl border-black/5 border focus-visible:ring-primary focus:ring-2 placeholder-white/70" />
</template>
