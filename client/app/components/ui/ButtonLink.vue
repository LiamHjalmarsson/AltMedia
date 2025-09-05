<script setup lang="ts">
const { to, external = false } = defineProps<{ to: string; external?: boolean }>();
</script>

<template>
	<div ref="linkWrapper" class="relative py-xs px-2xl w-fit cursor-pointer">
		<NuxtLink :to="to || '#services'" :target="external ? '_blank' : undefined" :class="['relative font-bold']">
			<span class="relative z-10"><slot /></span>
		</NuxtLink>
		<span ref="bg" class="absolute top-0 left-0 h-10 w-10 bg-primary rounded-full" />
	</div>
</template>
