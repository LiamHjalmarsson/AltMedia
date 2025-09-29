<script setup lang="ts">
import type { Offer } from "~/types/content/collections";

defineProps<{
	offers: Offer[];
	currentOfferId: number | null;
}>();

const emit = defineEmits(["select"]);

function handleSelect(offerId: number) {
	emit("select", offerId);
}
</script>

<template>
	<div class="space-y-xl">
		<h2 class="text-heading-lg font-bold text-center">1. Välj ett paket</h2>

		<Grid class="md:grid-cols-3 gap-2xl">
			<div
				v-for="offer in offers"
				:key="offer.id"
				@click="handleSelect(offer.id)"
				class="group relative cursor-pointer rounded-2xl p-xl border shadow-md transition hover:shadow-lg"
				:class="[
					currentOfferId === offer.id
						? 'border-primary ring-2 ring-primary bg-primary/5'
						: 'border-light/20 bg-white',
				]">
				<div
					v-if="offer.is_popular"
					class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-md py-xs bg-primary text-light text-xs font-semibold rounded-full shadow-md">
					Mest populär
				</div>

				<div class="flex justify-center mb-lg">
					<NuxtImg
						v-if="offer.icon?.is_image && offer.icon.image?.url"
						:src="offer.icon.image.url"
						width="64"
						height="64"
						class="rounded-lg shadow-sm" />
					<Icon
						v-else-if="offer.icon?.icon_name"
						:name="offer.icon.icon_name"
						size="40"
						class="text-primary" />
				</div>

				<h3 class="text-heading-md font-bold text-center mb-sm">
					{{ offer.title }}
				</h3>

				<p class="text-sm text-dark-gray text-center mb-md">
					{{ offer.description }}
				</p>

				<p class="text-xl font-extrabold text-primary text-center mb-md">
					{{ offer.start_price ? offer.start_price + " kr" : "Kontakta oss" }}
				</p>

				<ul class="space-y-xs text-sm text-dark-gray">
					<li v-for="(feature, i) in offer.features" :key="i" class="flex items-center">
						<Icon name="lucide:check-circle" size="16" class="text-green-500 mr-xs" />
						<span>{{ feature }}</span>
					</li>
				</ul>
			</div>
		</Grid>
	</div>
</template>
