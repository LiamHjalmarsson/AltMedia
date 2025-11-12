<script setup lang="ts">
const { required = false } = defineProps<{ required?: boolean }>();
</script>

<template>
	<label v-bind="$attrs" @mousedown.prevent class="text-sm mb-xs block font-medium select-none cursor-pointer">
		<slot />
		<span v-if="required" aria-hidden="true" class="text-error ml-2xs">*</span>
	</label>
</template>
