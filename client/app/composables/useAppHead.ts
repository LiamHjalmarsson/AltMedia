// composables/useAppHead.ts
export function useAppHead() {
	const globalStore = useGlobalStore();

	const { data } = useAsyncData("global", () => globalStore.fetchGlobalConfig(), { server: true });

	const { globalConfig, seo } = storeToRefs(globalStore);

	useHead({
		titleTemplate: (titleChunk?: string) => {
			const site = globalConfig.value?.site_name || "";

			if (!titleChunk && site) return site;

			return titleChunk && site ? `${titleChunk} | ${site}` : titleChunk || null;
		},
		htmlAttrs: { lang: "sv" },
		link: globalConfig.value?.favicon.url
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

	return { data, globalConfig, seo };
}
