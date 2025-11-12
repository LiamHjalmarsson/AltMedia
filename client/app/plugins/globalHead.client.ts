export default defineNuxtPlugin(() => {
	const globalStore = useGlobalStore();

	const { globalConfig } = storeToRefs(globalStore);

	useHead({
		titleTemplate: (titleChunk?: string) => {
			const site = globalConfig.value?.site_name || "Alt Media";
			if (!titleChunk) return site;
			return `${titleChunk} | ${site}`;
		},
		htmlAttrs: { lang: "sv" },
		link: computed(() =>
			globalConfig.value?.favicon?.url
				? [
						{
							rel: "icon",
							type: "image/png",
							href: globalConfig.value.favicon.url,
						},
					]
				: []
		),
	});
});
