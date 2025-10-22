<script setup lang="ts">
import type { FeaturedOffersBlock } from "~/types/content/blocks";

const { block } = defineProps<{ block: FeaturedOffersBlock }>();

const buildProjectStore = useBuildProjectStore();
</script>

<template>
	<Section>
		<Container>
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				class="mb-sm md:mb-md lg:mb-xl xl:mb-2xl" />

			<div class="grid md:grid-cols-3 gap-2xl">
				<Card
					v-for="offer in block.offers"
					:key="offer.id"
					class="p-lg relative"
					:class="offer.is_popular ? 'scale-105 border border-primary' : ''">
					<div class="mx-auto my-lg">
						<NuxtImg
							v-if="offer.icon?.is_image"
							:src="offer.icon.image?.url"
							:alt="offer.icon.image?.alternativeText || offer.title"
							sizes="100vw sm:50vw md:33vw"
							densities="x1 x2"
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
						<h3 class="text-heading-md font-bold text-center px-lg">{{ offer.title }}</h3>
						<p class="mt-md px-lg text-sm text-dark-gray text-center">{{ offer.description }}</p>
						<p class="mt-md text-center text-2xl font-extrabold text-primary">
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

					<Button
						@click="
							() => {
								buildProjectStore.setCurrentOffer(offer.id);
								navigateTo('/starta-projekt');
							}
						"
						class="mx-auto text-sm">
						Välj {{ offer.title }}
					</Button>

					<div
						v-if="offer.is_popular"
						class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-lg py-xs shadow-2xl shadow-primary bg-primary rounded-full text-light font-semibold text-xs">
						Mest populär
					</div>
				</Card>
			</div>
		</Container>
	</Section>
</template>
