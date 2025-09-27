<script setup lang="ts">
import type { Offer, Subservice } from "~/types/content/collections";

const props = defineProps<{
	subservices: Subservice[];
	currentOffer: Offer | null;
	selectedIds: Set<number>;
}>();

const emit = defineEmits<{
	(e: "toggle", sub: Subservice): void;
}>();

function isIncluded(subService: Subservice) {
	return props.currentOffer?.subservices?.some((sub: Subservice) => sub.id === subService.id);
}
</script>

<template>
	<div class="space-y-lg">
		<h2 class="text-heading-md font-bold">2. Tillägg</h2>

		<div class="grid grid-cols-2 gap-lg">
			<label
				v-for="sub in subservices"
				:key="sub.id"
				class="group flex flex-col justify-between rounded-2xl border p-lg shadow-sm transition cursor-pointer hover:shadow-md"
				:class="[
					selectedIds.has(sub.id) || isIncluded(sub)
						? 'border-primary bg-primary/5'
						: 'border-light/20 hover:border-primary/40',
				]">
				<div class="flex items-start justify-between gap-md">
					<div>
						<p class="font-semibold text-dark">{{ sub.title }}</p>
						<p class="text-xs text-dark-gray mt-1 line-clamp-2">
							{{ sub.content || "Ingen beskrivning tillagd." }}
						</p>
					</div>
					<input
						type="checkbox"
						class="w-4 h-4 accent-primary mt-xs"
						:checked="selectedIds.has(sub.id) || isIncluded(sub)"
						:disabled="isIncluded(sub)"
						@change="emit('toggle', sub)" />
				</div>

				<div class="mt-md text-sm font-medium">
					<span v-if="isIncluded(sub)" class="text-primary font-semibold">Ingår</span>
					<span v-else>
						<span v-if="sub.price_once" class="text-dark">+ {{ sub.price_once }} kr</span>
						<span v-if="sub.price_month" class="ml-sm text-dark-gray">/ {{ sub.price_month }} kr/mån</span>
					</span>
				</div>
			</label>
		</div>
	</div>
</template>
