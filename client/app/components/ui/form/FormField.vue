<script setup lang="ts">
defineProps<{
	name: string;
	label: string;
	error?: string;
	required?: boolean;
}>();
</script>

<template>
	<div class="flex flex-col space-y-sm">
		<Label :for="name" :required>{{ label }}</Label>

		<slot />

		<p v-if="error" role="alert" class="text-xs text-error">{{ error }}</p>
	</div>
</template>
