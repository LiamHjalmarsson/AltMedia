<script setup lang="ts">
defineProps<{
	label?: string;
	icon?: string;
	size?: number;
	to: string;
}>();
</script>

<template>
	<NuxtLink
		:to="to"
		aria-label="label || 'Läs mer'"
		class="inline-flex items-center font-semibold transition group cursor-pointer min-w-[44px]">
		{{ label || "Läs mer" }}

		<span
			class="opacity-0 -translate-x-1 transition-all duration-300 pl-xs group-hover:opacity-100 group-hover:translate-x-0 flex items-center">
			<Icon :name="icon || 'lucide:arrow-right'" :size="size || 16" />
		</span>
	</NuxtLink>
</template>
