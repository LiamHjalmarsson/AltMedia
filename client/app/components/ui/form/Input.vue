<script setup lang="ts">
import { computed, useAttrs } from "vue";

const emit = defineEmits(["update:modelValue"]);

defineProps<{ modelValue?: string | number }>();

const attrs = useAttrs();

const ariaLabel = computed(() => {
	if (typeof attrs["aria-label"] === "string") return attrs["aria-label"];

	if (typeof attrs.placeholder === "string") return attrs.placeholder;

	if (typeof attrs.name === "string") return attrs.name;

	return undefined;
});

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
		:aria-label="ariaLabel"
		class="w-full py-sm px-sm backdrop-blur-lg transition outline-0 shadow-xl border-dark/5 border focus-visible:ring-primary focus:ring-2" />
</template>
