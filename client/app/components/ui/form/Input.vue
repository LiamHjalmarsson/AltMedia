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
		:class="[
			'w-full py-xs px-sm border border-gray outline-none backdrop-blur-lg  focus-visible:outline-primary transition',
		]" />
</template>
