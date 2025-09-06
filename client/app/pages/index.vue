<script setup lang="ts">
import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import FeaturedOffersBlock from "~/components/blocks/featured/FeaturedOffersBlock.vue";
import FeaturedServicesBlock from "~/components/blocks/featured/FeaturedServicesBlock.vue";
import FullSectionBlock from "~/components/blocks/fullSection/FullSectionBlock.vue";
import ListBlock from "~/components/blocks/list/ListBlock.vue";
import type { Blocks } from "~/types/content/blocks";
import type { HomePage } from "~/types/content/singles";

const { findOne } = useStrapi();

const { data: dataResponse } = await useAsyncData<Strapi5ResponseSingle<HomePage>>(
	"home-page",
	() => findOne("home-page"),
	{ server: true }
);

const hero = computed(() => dataResponse.value?.data.hero ?? null);

const blocks = computed<Blocks[]>(() => dataResponse?.value?.data.blocks ?? []);

const componentMap: Record<string, any> = {
	"block.featured-services": FeaturedServicesBlock,
	"block.list": ListBlock,
	"block.featured-offers": FeaturedOffersBlock,
	"block.full-section": FullSectionBlock,
};
</script>

<template>
	<HeroBlock :block="hero" />

	<template v-for="block in blocks" :key="`${block.__component}-${block.id}`">
		<component v-if="componentMap[block.__component]" :is="componentMap[block.__component]" :block="block" />
	</template>
</template>
