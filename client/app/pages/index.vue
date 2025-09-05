<script setup lang="ts">
import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { HomePage } from "~/types/singels/homePage";

const { findOne } = useStrapi();

const { data: dataResponse } = await useAsyncData<Strapi5ResponseSingle<HomePage>>(
	"home-page",
	() => findOne("home-page"),
	{ server: true }
);

const hero = computed(() => dataResponse.value?.data.hero ?? null);
</script>

<template>
	<Hero :block="hero" />
</template>
