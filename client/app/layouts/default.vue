<script setup lang="ts">
const globalStore = useGlobalStore();

await useAsyncData("global", () => globalStore.fetchGlobalConfig(), { server: true });

const { globalConfig, seo } = storeToRefs(globalStore);

useHead({
	titleTemplate: (titleChunk?: string) =>
		titleChunk
			? titleChunk + (globalConfig.value?.site_name ? ` | ${globalConfig.value.site_name}` : "")
			: (globalConfig.value?.site_name ?? null),
	htmlAttrs: { lang: "sv" },
	link: globalConfig.value?.favicon
		? [
				{
					rel: "icon",
					type: "image/png",
					href: globalConfig.value.favicon.url,
				},
			]
		: [],
});

useSeoMeta({
	description: seo.value?.meta_description,

	ogTitle: seo.value?.meta_title,
	ogDescription: seo.value?.meta_description,
	ogImage: seo.value?.meta_image?.url,
	ogUrl: seo.value?.meta_canonical_url,

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

		<FooterCta />

		<Footer />
	</div>
</template>
