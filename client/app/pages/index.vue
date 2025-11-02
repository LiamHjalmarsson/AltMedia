<script setup lang="ts">
import type { Blocks } from "~/types/content/blocks";

const homeStore = useHomeStore();

await useAsyncData("home-page", () => homeStore.fetchHomePage(), { server: true });

const { homePage } = storeToRefs(homeStore);

const hero = computed(() => homePage.value?.hero ?? null);

const form = computed(() => homePage.value?.form ?? null);

const hasForm = computed(() => Boolean(homePage.value?.has_form && form.value));

const blocks = computed<Blocks[]>(() => homePage?.value?.blocks ?? []);
</script>

<template>
	<Hero v-if="hero" :block="hero" :hasForm>
		<HeroForm :form class="max-w-[450px]" />
	</Hero>

	<BlockRenderer v-if="blocks?.length" :blocks="blocks" />
</template>
