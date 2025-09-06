<script setup lang="ts">
import type { Offer } from "~/types/collections/offer";

const { offer } = defineProps<{ offer: Offer }>();
</script>

<template>
	<Card class="p-lg relative" :class="offer.is_populare ? 'scale-105 border border-primary' : ''">
		<div class="mx-auto my-lg">
			<NuxtImg
				v-if="offer.icon?.is_image"
				:src="offer.icon.image?.url"
				width="80"
				height="80"
				class="rounded-md" />
			<Icon v-else-if="offer.icon?.icon_name" :name="offer.icon.icon_name" size="40" class="text-primary" />
		</div>

		<div class="mb-md flex-1">
			<h3 class="text-heading-md font-bold text-center px-lg">{{ offer.title }}</h3>

			<p class="mt-md px-lg text-sm text-dark-gray text-center">
				{{ offer.description }}
			</p>

			<p class="mt-md text-center text-xxl font-extrabold text-primary">
				{{ offer.start_price ? offer.start_price + " kr" : "Kontakta oss" }}
			</p>

			<ul class="my-md px-xl">
				<li
					v-for="(feature, i) in offer.features"
					:key="i"
					class="flex items-center text-sm text-dark-gray mb-sm">
					<Icon name="lucide:check-circle" size="18" class="text-green-500 mr-xs" />
					<span>{{ feature }}</span>
				</li>
			</ul>
		</div>

		<ButtonLink to="/contact" class="mx-auto text-sm"> Välj {{ offer.title }} </ButtonLink>

		<div
			v-if="offer.is_populare"
			class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-lg py-xs shadow-2xl shadow-primary bg-primary rounded-full text-light font-semibold text-xs">
			Mest populär
		</div>
	</Card>
</template>
