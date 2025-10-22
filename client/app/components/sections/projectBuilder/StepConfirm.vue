<script setup lang="ts">
import type { Offer, Subservice } from "~/types/content/collections";

defineProps<{
	currentOffer: Offer | null;
	selectedSubs: Subservice[];
	totalOnce: number;
	totalMonthly: number;
}>();
</script>

<template>
	<div class="space-y-lg">
		<h2 class="text-heading-md font-bold">4. Bekräfta & skicka</h2>

		<div
			class="p-xl border border-light/20 shadow-md space-y-md flex flex-col rounded-2xl group transition transform duration-300">
			<ul class="space-y-sm text-dark-gray">
				<li><b>Paket:</b> {{ currentOffer?.title || "Ej valt" }}</li>
				<li><b>Antal tillägg:</b> {{ selectedSubs.length }}</li>
				<li><b>Engångskostnad:</b> {{ totalOnce }} kr</li>
				<li v-if="totalMonthly"><b>Månadskostnad:</b> {{ totalMonthly }} kr/mån</li>
			</ul>
			<p class="mt-md text-sm text-dark-gray">Skicka din förfrågan, vi återkommer inom 24h.</p>
		</div>
	</div>
</template>
