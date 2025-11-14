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
		aria-label="Läs mer om innehållet"
		class="inline-flex items-center text-xs font-semibold text-primary cursor-pointer group focus-visible:outline-primary min-h-[44px] min-w-[44px] pr-md">
		{{ label || "Läs mer" }}
		<span
			class="opacity-0 -translate-x-xs transition pl-sm group-hover:opacity-100 group-hover:translate-x-0 flex justify-center items-center">
			<Icon :name="icon || 'lucide:arrow-right'" :size="size || 16" />
		</span>
	</button>
</template>
