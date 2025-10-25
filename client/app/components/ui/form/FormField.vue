<script setup lang="ts">
defineProps<{
	id?: string;
	label: string;
	error?: string;
	required?: boolean;
}>();
</script>

<template>
	<div class="flex flex-col space-y-2xs">
		<Label :for="id || label" :required>{{ label }}</Label>
		<slot />
		<p v-if="error" class="text-xs text-error">{{ error }}</p>
	</div>
</template>
