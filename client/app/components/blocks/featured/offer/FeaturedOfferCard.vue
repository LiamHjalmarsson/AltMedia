<script setup lang="ts">
import type { Offer } from "~/types/content/collections";

defineProps<{ offer: Offer }>();

const emit = defineEmits(["select"]);
</script>

<template>
	<Card class="p-lg" :class="{ 'scale-105 ': offer?.is_popular }">
		<div
			v-if="offer.is_popular"
			class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-light rounded-full px-lg py-xs font-semibold text-xs shadow-lg shadow-primary">
			Mest populär
		</div>

		<div class="flex justify-center items-center mb-md">
			<NuxtImg
				v-if="offer.icon?.is_image"
				:src="offer.icon.image?.url"
				:alt="offer.icon.image?.alternativeText || offer.title"
				format="webp"
				quality="85"
				width="100"
				height="100"
				loading="lazy"
				class="rounded-md" />
			<Icon v-else-if="offer.icon?.icon_name" :name="offer.icon.icon_name" size="40" class="text-primary" />
		</div>

		<div class="mb-md flex-1 space-y-sm">
			<h3 class="text-heading-md font-bold text-center">
				{{ offer.title }}
			</h3>

			<p class="text-sm text-dark-gray text-center">
				{{ offer.description }}
			</p>

			<h4 class="text-xl font-bold text-primary text-center my-md">
				{{ offer.start_price ? `${offer.start_price} kr` : "Kontakta oss" }}
			</h4>

			<ul class="space-y-xs mb-md">
				<li v-for="(feature, i) in offer.features" :key="i" class="flex items-center text-sm text-dark-gray">
					<Icon name="lucide:check-circle" size="18" class="text-green-500 mr-xs" />
					<span>
						{{ feature }}
					</span>
				</li>
			</ul>
		</div>

		<Button @click="emit('select')" class="mx-auto text-sm"> Välj {{ offer.title }} </Button>
	</Card>
</template>
