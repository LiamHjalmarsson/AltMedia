<script setup lang="ts">
import type { Offer } from "~/types/content/collections";

const props = defineProps<{
	offers: Offer[];
	loading: boolean;
	currentOfferId: number | null | undefined;
}>();

const emit = defineEmits<{
	(e: "select", offer: Offer): void;
}>();
</script>

<template>
	<div class="space-y-lg">
		<h2 class="text-heading-md font-bold">1. Välj paket</h2>
		<p class="text-sm text-dark-gray mb-md">Välj det paket som bäst matchar ditt projekt.</p>

		<div v-if="loading" class="text-dark-gray">Laddar paket…</div>

		<div v-else class="grid grid-cols-2 gap-xl">
			<button
				v-for="offer in offers"
				:key="offer.id"
				type="button"
				@click="emit('select', offer)"
				:class="[
					'flex flex-col justify-between h-full rounded-2xl border p-xl shadow-sm text-left transition group',
					props.currentOfferId === offer.id
						? 'border-primary bg-primary/5 shadow-md'
						: 'border-light/20 hover:border-primary/40 hover:shadow-md',
				]">
				<div class="flex items-center gap-md">
					<Icon v-if="offer.icon?.icon_name" :name="offer.icon.icon_name" size="28" class="text-primary" />
					<h3 class="text-lg font-semibold">{{ offer.title }}</h3>
				</div>

				<p class="text-sm text-dark-gray mt-sm line-clamp-3">
					{{ offer.description }}
				</p>

				<div class="mt-md flex flex-wrap items-center gap-md">
					<span class="font-semibold text-dark">
						Från {{ offer.start_price ? offer.start_price + " kr" : "—" }}
					</span>
					<span v-if="offer.month_price" class="text-sm text-dark-gray">
						• {{ offer.month_price }} kr/mån
					</span>
				</div>

				<ul v-if="offer.features?.length" class="mt-md space-y-1 text-sm text-dark-gray">
					<li v-for="(feature, i) in offer.features" :key="i" class="flex items-center gap-xs">
						<Icon name="heroicons:check-circle-20-solid" class="text-primary shrink-0" size="18" />
						<span>{{ feature }}</span>
					</li>
				</ul>
			</button>
		</div>
	</div>
</template>
