<script setup lang="ts">
defineProps<{
	index: number;
	last: boolean;
}>();

const emit = defineEmits<{
	(e: "prev"): void;
	(e: "next"): void;
	(e: "submit"): void;
}>();
</script>

<template>
	<div class="flex justify-between items-center pt-xl space-x-xl">
		<Button
			v-if="index > 1"
			type="button"
			label="Tillbaka"
			icon="lucide:arrow-left"
			variant="outline"
			size="md"
			reversed
			@click="emit('prev')" />

		<Button
			v-if="!last"
			type="button"
			label="Nästa"
			icon="lucide:arrow-right"
			variant="primary"
			size="md"
			class="ml-auto"
			@click="emit('next')" />

		<Button
			v-if="last"
			type="submit"
			label="Skicka"
			icon="lucide:send"
			variant="primary"
			size="md"
			class="ml-auto"
			@click="emit('submit')" />
	</div>
</template>
