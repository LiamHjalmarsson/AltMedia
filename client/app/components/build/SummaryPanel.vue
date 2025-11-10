<script setup lang="ts">
defineProps<{
	summaryData: Record<string, string | string[] | undefined>;
}>();
</script>

<template>
	<aside class="sticky top-24 bg-light border border-light/20 shadow-md p-xl h-fit space-y-lg">
		<h3 class="text-heading-md font-bold text-dark">Sammanfattning</h3>

		<div class="text-dark/80 text-sm">
			<div v-for="(v, key) in summaryData" :key="key" class="border-b border-light/20 pb-md">
				<p class="font-semibold text-md">{{ key }}</p>

				<p class="text-sm font-medium mt-xs">{{ Array.isArray(v) ? v.join(", ") : v || "—" }}</p>
			</div>
		</div>

		<p v-if="Object.keys(summaryData).length === 0" class="text-gray text-sm">Inga uppgifter ifyllda ännu.</p>
	</aside>
</template>
