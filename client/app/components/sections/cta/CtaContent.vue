<script setup lang="ts">
defineProps<{
	title: string;
	description?: string;
}>();
</script>

<template>
	<div class="flex-1 space-y-md md:text-left">
		<h2 id="cta-title" class="text-heading-lg md:text-heading-xl font-semibold leading-tight">
			{{ title }}
		</h2>

		<p v-if="description" class="text-base sm:text-lg md:text-xl text-light/90 mx-auto md:mx-0">
			{{ description }}
		</p>
	</div>
</template>
