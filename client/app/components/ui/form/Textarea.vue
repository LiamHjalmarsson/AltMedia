<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

defineProps<{ modelValue?: string | number }>();

function handleTextarea(e: Event) {
	const target = e.target as HTMLTextAreaElement;

	if (!target) {
		return;
	}

	emit("update:modelValue", target.value);
}
</script>

<template>
	<textarea
		v-bind="$attrs"
		:value="modelValue"
		@input="handleTextarea"
		:class="[
			'w-full py-sm px-md outline-none backdrop-blur-lg transition shadow-xl border-black/5 border text-start cursor-pointer focus-visible:ring-primary focus:ring-2 ',
		]" />
</template>
