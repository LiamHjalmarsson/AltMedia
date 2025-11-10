<script setup lang="ts">
defineProps<{
	options: string[];
}>();
</script>

<template>
	<div class="flex flex-wrap gap-md">
		<div
			v-for="option in options"
			:key="option"
			class="border border-gray/30 bg-gray/10 px-3xl py-sm rounded-lg text-dark text-md font-medium cursor-default select-none">
			{{ option }}
		</div>
	</div>
</template>
