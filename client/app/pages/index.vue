<script setup lang="ts">
import type { Blocks } from "~/types/content/blocks";

const homeStore = useHomeStore();

await useAsyncData("home-page", () => homeStore.fetchHomePage(), { server: true });

const { homePage, loading } = storeToRefs(homeStore);

const hero = computed(() => homePage.value?.hero ?? null);

const form = computed(() => homePage.value?.hero_form ?? null);

const blocks = computed<Blocks[]>(() => homePage?.value?.blocks ?? []);
</script>

<template>
	<Hero :block="hero">
		<HeroForm v-if="form" :form class="max-w-[450px]" />
	</Hero>

	<BlockRenderer :blocks />
</template>
