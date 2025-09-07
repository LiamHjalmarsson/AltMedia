<script setup lang="ts">
import HeroBlock from "./hero/HeroBlock.vue";
import FeaturedServicesBlock from "./featured/services/FeaturedServicesBlock.vue";
import FeaturedOffersBlock from "./featured/offers/FeaturedOffersBlock.vue";
import ListBlock from "./list/ListBlock.vue";
import FullSectionBlock from "./fullSection/FullSectionBlock.vue";
import type { Blocks } from "~/types/content/blocks";

defineProps<{ blocks: Blocks[] }>();
</script>

<template>
	<template v-for="block in blocks" :key="`${block.__component}-${block.id}`">
		<HeroBlock v-if="block.__component === 'block.hero'" :block="block" />
		<FeaturedServicesBlock v-if="block.__component === 'block.featured-services'" :block="block" />
		<FeaturedOffersBlock v-if="block.__component === 'block.featured-offers'" :block="block" />
		<ListBlock v-if="block.__component === 'block.list'" :block="block" />
		<FullSectionBlock v-if="block.__component === 'block.full-section'" :block="block" />
		<FeaturedProjectsBlock v-if="block.__component === 'block.featured-projects'" :block="block" />
	</template>
</template>
