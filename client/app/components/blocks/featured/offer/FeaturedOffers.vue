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
		<div class="container mx-auto max-w-[1600px] px-md">
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				class="mb-sm md:mb-md lg:mb-xl xl:mb-2xl" />

			<ul class="grid md:grid-cols-3 gap-2xl">
				<li v-for="offer in block.offers" :key="offer.id">
					<FeaturedOfferCard :offer @select="selectOffer(offer.id)" />
				</li>
			</ul>
		</div>
	</section>
</template>
