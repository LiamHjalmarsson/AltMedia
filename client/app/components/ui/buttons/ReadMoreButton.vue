<script setup lang="ts">
defineProps<{
	label?: string;
	icon?: string;
	size?: number;
}>();
</script>

<template>
	<button
		type="button"
		aria-label="Läs mer"
		class="inline-flex items-center text-xs font-semibold text-primary transition group cursor-pointer min-h-[44px] min-w-[44px] focus-visible:outline-primary">
		{{ label || "Läs mer" }}

		<span
			class="opacity-0 -translate-x-1 transition-all duration-300 pl-xs group-hover:opacity-100 group-hover:translate-x-0 flex items-center">
			<Icon :name="icon || 'lucide:arrow-right'" :size="size || 16" />
		</span>
	</button>
</template>
