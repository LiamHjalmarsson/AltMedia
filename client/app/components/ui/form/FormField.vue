<script setup lang="ts">
defineProps<{
	name: string;
	label: string;
	error?: string;
	required?: boolean;
}>();
</script>

<template>
	<div class="flex flex-col space-y-2xs">
		<Label :for="name.toLowerCase()" :required>{{ label }}</Label>
		<slot />
		<p v-if="error" class="text-xs text-error">{{ error }}</p>
	</div>
</template>
