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
		<h2 class="text-heading-lg font-bold text-center mb-lg">1. Välj ett paket</h2>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-xl">
			<div
				v-for="offer in offers"
				:key="offer.id"
				@click="handleSelect(offer.id)"
				class="relative cursor-pointer rounded-2xl border shadow-md bg-white flex flex-col transition hover:shadow-xl"
				:class="[
					currentOfferId === offer.id
						? 'border-primary ring-2 ring-primary/40 bg-primary/5'
						: 'border-light/30 hover:border-primary/40',
				]">
				<div
					v-if="offer.is_popular"
					class="absolute -top-3 left-1/2 -translate-x-1/2 px-md py-xs bg-primary text-light text-xs font-semibold rounded-full shadow-md">
					Mest populär
				</div>

				<div class="flex flex-col items-center text-center p-lg border-b border-light/20">
					<NuxtImg
						v-if="offer.icon?.is_image && offer.icon.image?.url"
						:src="offer.icon.image.url"
						:alt="offer.icon.image.alternativeText || ''"
						width="64"
						height="64"
						sizes="64px"
						format="webp"
						quality="80"
						placeholder
						loading="lazy"
						class="rounded-lg shadow-sm mb-md" />

					<Icon
						v-else-if="offer.icon?.icon_name"
						:name="offer.icon.icon_name"
						size="40"
						class="text-primary mb-md" />

					<h3 class="text-heading-md font-bold">{{ offer.title }}</h3>
					<p class="text-sm text-dark-gray mt-xs">{{ offer.description }}</p>
				</div>

				<ul class="flex-1 p-lg space-y-sm">
					<li v-for="(feature, i) in offer.features" :key="i" class="flex items-start text-sm text-dark-gray">
						<Icon name="lucide:check-circle" size="16" class="text-green-500 mr-xs mt-[2px]" />
						<span>{{ feature }}</span>
					</li>
				</ul>

				<div class="p-lg border-t border-light/20 text-center">
					<p class="text-xl font-extrabold text-primary mb-md">
						{{ offer.start_price ? offer.start_price + " kr" : "Kontakta oss" }}
						<span v-if="offer.month_price" class="block text-sm font-normal text-dark-gray">
							{{ offer.month_price }} kr/mån
						</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
