<script setup lang="ts">
const homeStore = useHomeStore();

useAppHead();

await useAsyncData("home-page", () => homeStore.fetchHomePage(), { server: true });

const { hero, hasForm, form, blocks } = storeToRefs(homeStore);
</script>

<template>
	<Hero v-if="hero" :block="hero" :hasForm>
		<HeroForm :form class="max-w-[450px]" />
	</Hero>

	<BlockRenderer v-if="blocks?.length" :blocks="blocks" />
</template>
