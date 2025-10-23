<script setup lang="ts">
import type { FeaturedOffersBlock } from "~/types/content/blocks";

const { block } = defineProps<{ block: FeaturedOffersBlock }>();

const buildProjectStore = useBuildProjectStore();

function selectOffer(id: number) {
	buildProjectStore.setCurrentOffer(id);

	navigateTo("/starta-projekt");
}
</script>

<template>
	<section class="relative flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl">
		<div class="container mx-auto max-w-[1400px] px-md">
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				class="mb-sm md:mb-md lg:mb-xl xl:mb-2xl" />

			<div class="grid md:grid-cols-3 gap-2xl">
				<div
					v-for="offer in block.offers"
					:key="offer.id"
					class="p-lg relative flex flex-col rounded-xl group transition duration-300 shadow-2xl bg-light/5"
					:class="offer.is_popular ? 'scale-105  shadow-primary' : ''">
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
							densities="x1 x2"
							width="80"
							height="80"
							format="webp"
							quality="85"
							placeholder
							loading="lazy"
							class="rounded-md" />
						<Icon
							v-else-if="offer.icon?.icon_name"
							:name="offer.icon.icon_name"
							size="40"
							class="text-primary" />
					</div>

					<div class="mb-md flex-1">
						<h3 class="text-heading-md font-bold text-center mb-sm">
							{{ offer.title }}
						</h3>

						<p class="text-sm text-dark-gray text-center mb-md">
							{{ offer.description }}
						</p>

						<p class="text-xl font-bold text-primary text-center mb-lg">
							{{ offer.start_price ? `${offer.start_price} kr` : "Kontakta oss" }}
						</p>

						<ul class="space-y-xs mb-lg">
							<li
								v-for="(feature, i) in offer.features"
								:key="i"
								class="flex items-center text-sm text-dark-gray mb-sm">
								<Icon name="lucide:check-circle" size="18" class="text-green-500 mr-xs" />
								<span>
									{{ feature }}
								</span>
							</li>
						</ul>
					</div>

					<Button @click="selectOffer(offer.id)" class="mx-auto text-sm"> Välj {{ offer.title }} </Button>
				</div>
			</div>
		</div>
	</section>
</template>
