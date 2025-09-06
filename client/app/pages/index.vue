<script setup lang="ts">
import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import List from "~/components/block/list/list.vue";
import FeaturedServiceList from "~/components/block/service/featured/FeaturedServiceList.vue";
import type { Blocks } from "~/types/blocks/enums";
import type { HomePage } from "~/types/singels/homePage";

const { findOne } = useStrapi();

const { data: dataResponse } = await useAsyncData<Strapi5ResponseSingle<HomePage>>(
	"home-page",
	() => findOne("home-page"),
	{ server: true }
);

const hero = computed(() => dataResponse.value?.data.hero ?? null);

const blocks = computed<Blocks[]>(() => dataResponse?.value?.data.blocks ?? []);

const componentMap: Record<string, any> = {
	"block.featured-services": FeaturedServiceList,
	"block.list": List,
};
</script>

<template>
	<Hero :block="hero" />

	<template v-for="block in blocks" :key="`${block.__component}-${block.id}`">
		<component v-if="componentMap[block.__component]" :is="componentMap[block.__component]" :block="block" />
	</template>
</template>
