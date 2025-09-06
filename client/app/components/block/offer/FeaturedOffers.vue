<script setup lang="ts">
import type { FeaturedOffersBlock } from "~/types/content/blocks";

defineProps<{ block: FeaturedOffersBlock }>();
</script>

<template>
	<Section>
		<Container>
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				class="mb-sm md:mb-md lg:mb-xl xl:mb-2xl" />
			<Grid class="md:grid-cols-3">
				<FeaturedOffersItem v-for="offer in block.offers" :key="offer.id" :offer />
			</Grid>
		</Container>
	</Section>
</template>
