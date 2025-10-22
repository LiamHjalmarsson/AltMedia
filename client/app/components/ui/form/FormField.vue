<script setup lang="ts">
defineProps<{
	id?: string;
	label: string;
	error?: string;
	required?: boolean;
}>();
</script>

<template>
	<div>
		<Label :for="id || label" :required>{{ label }}</Label>
		<slot />
		<p v-if="error" class="mt-2xs text-xs text-error">{{ error }}</p>
	</div>
</template>
