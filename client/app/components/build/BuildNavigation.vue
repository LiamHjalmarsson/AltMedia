<script setup lang="ts">
const props = defineProps<{
	index: number;
	last: boolean;
	onNext: () => void;
	onPrev: () => void;
	onSubmit: () => void;
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
			@click="onPrev" />

		<Button
			v-if="!last"
			type="button"
			label="Nästa"
			icon="lucide:arrow-right"
			variant="primary"
			size="md"
			class="ml-auto"
			@click="onNext" />

		<Button
			v-if="last"
			type="submit"
			label="Skicka"
			icon="lucide:send"
			variant="primary"
			size="md"
			class="ml-auto"
			@click="onSubmit" />
	</div>
</template>
