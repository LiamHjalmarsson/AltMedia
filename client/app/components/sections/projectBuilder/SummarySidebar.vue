<script setup lang="ts">
import type { Subservice } from "~/types/content/collections";

defineProps<{
	selectedSubs: Subservice[];
	summary: string;
	totalOnce: number;
	totalMonthly: number;
}>();
</script>

<template>
	<div class="sticky top-24 p-xl rounded-2xl border border-light/20 bg-light/10 shadow-lg backdrop-blur col-span-2">
		<h3 class="text-heading-md font-bold mb-lg">Sammanfattning</h3>
		<ul class="space-y-md text-dark-gray">
			<li><strong>Beskrivning:</strong> {{ summary || "Ej ifyllt" }}</li>
			<li>
				<strong>Tillägg:</strong>
				<ul class="mt-1 space-y-1">
					<li v-for="sub in selectedSubs" :key="sub.id" class="flex items-center justify-between">
						<span>{{ sub.title }}</span>
					</li>
					<li v-if="!selectedSubs.length" class="text-dark-gray">Inga valda</li>
				</ul>
			</li>
		</ul>
		<div class="mt-xl border-t pt-lg space-y-xs">
			<p class="text-heading-sm font-semibold">Engångskostnad: {{ totalOnce }} kr</p>
			<p v-if="totalMonthly" class="text-heading-sm font-semibold">Månadskostnad: {{ totalMonthly }} kr/mån</p>
		</div>
	</div>
</template>
