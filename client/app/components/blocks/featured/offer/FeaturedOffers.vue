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
	<section class="relative py-3xl lg:py-5xl">
		<div class="mx-auto max-w-[1300px] px-xl lg:px-3xl">
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				class="mb-md lg:mb-lg xl:mb-xl" />

			<ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3xl sm:gap-lg lg:gap-2xl mt-lg md:mt-xl lg:mt-2xl">
				<li v-for="offer in block.offers" :key="offer.id">
					<FeaturedOfferCard :offer @select="selectOffer(offer.id)" />
				</li>
			</ul>
		</div>
	</section>
</template>
