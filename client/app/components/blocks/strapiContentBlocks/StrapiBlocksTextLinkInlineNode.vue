<script setup lang="ts">
defineProps<{
	url: string;
}>();
</script>

<template>
	<a :href="url" class="">
		<slot />
	</a>
</template>
