<script setup lang="ts">
import type { Website, Subservice } from "~/types/content/collections";

defineProps<{
	currentOffer: Website | null;
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
			<li><strong>Paket:</strong> {{ currentOffer?.title || "Ej valt" }}</li>
			<li><strong>Beskrivning:</strong> {{ summary || "Ej ifyllt" }}</li>
			<li>
				<strong>Tillägg:</strong>
				<ul class="mt-1 space-y-1">
					<li v-for="sub in selectedSubs" :key="sub.id" class="flex items-center justify-between">
						<span>{{ sub.title }}</span>
						<span
							class="text-sm text-dark-gray"
							v-if="!currentOffer?.subservices?.some((s: any) => s.id === sub.id)">
							<span v-if="sub.price_once">{{ sub.price_once }} kr</span>
							<span v-if="sub.price_month" class="ml-sm">/ {{ sub.price_month }} kr/mån</span>
						</span>
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
