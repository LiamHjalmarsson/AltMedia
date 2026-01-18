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
		class="w-full py-sm px-sm bg-white/10 transition outline-0 shadow-xl border-black/30 border focus-visible:ring-primary focus:ring-2 placeholder-black/80" />
</template>
