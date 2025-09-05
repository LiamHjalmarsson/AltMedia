<script setup lang="ts">
const globalStore = useGlobalStore();

await useAsyncData("global", () => globalStore.fetchGlobal(), { server: true });

const { globalConfig, seo } = storeToRefs(globalStore);

useHead({
	title: globalConfig.value?.site_name,

	htmlAttrs: { lang: "sv" },

	link: [
		{
			rel: "icon",
			type: "image/x-icon",
			href: globalConfig.value?.favicon.url,
		},
	],
});

useSeoMeta({
	description: seo.value?.meta_description,

	ogTitle: seo.value?.meta_title,
	ogDescription: seo.value?.meta_description,
	ogImage: seo.value?.meta_image?.url,
	ogUrl: seo.value?.meta_cannical_url,

	twitterTitle: seo.value?.meta_title,
	twitterDescription: seo.value?.meta_description,
	twitterImage: seo.value?.meta_image?.url,
	twitterCard: "summary_large_image",
});
</script>

<template>
	<div class="min-h-screen flex flex-col">
		<Navigation />

		<main class="grow">
			<slot />
		</main>

		<Footer />
	</div>
</template>
