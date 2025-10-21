<script setup lang="ts">
defineProps<{
	id?: string;
	label: string;
	error?: string;
}>();
</script>

<template>
	<div>
		<Label :for="id || label">{{ label }}</Label>
		<slot />
		<p v-if="error" class="mt-2xs text-xs text-error">{{ error }}</p>
	</div>
</template>
