<script setup lang="ts">
import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
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
</script>

<template>
	<Hero :block="hero" />

	<BlocksRenderer :blocks="blocks" />
</template>
