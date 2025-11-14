<script setup lang="ts">
import { inject } from "vue";

const optionProps = defineProps<{
	value: string | number;
}>();

const selectValue = inject<(value: string | number) => void>("selectValue");

function handleClick() {
	selectValue?.(optionProps.value);
}
</script>

<template>
	<div @click="handleClick" class="px-md py-xs cursor-pointer hover:bg-white/20 transition flex items-center">
		<slot>{{ value }}</slot>
	</div>
</template>
