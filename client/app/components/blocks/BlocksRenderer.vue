<script setup lang="ts">
import type { Blocks } from "~/types/content/blocks";

defineProps<{ blocks: Blocks[] }>();
</script>

<template>
	<template v-for="block in blocks" :key="`${block.__component}-${block.id}`">
		<Hero v-if="block.__component === 'block.hero'" :block="block" />
		<FeaturedServices v-if="block.__component === 'block.featured-services'" :block="block" />
		<FeaturedOffers v-if="block.__component === 'block.featured-offers'" :block="block" />
		<List v-if="block.__component === 'block.list'" :block="block" />
		<FullSection v-if="block.__component === 'block.full-section'" :block="block" />
		<FeaturedProjects v-if="block.__component === 'block.featured-projects'" :block="block" />
		<Faq v-if="block.__component === 'block.faq'" :block="block" />
		<FeaturedArticles v-else-if="block.__component === 'block.featured-articles'" :block="block" />
	</template>
</template>
