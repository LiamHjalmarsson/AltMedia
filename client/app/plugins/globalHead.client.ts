export default defineNuxtPlugin(() => {
	const globalStore = useGlobalStore();

	const { globalConfig } = storeToRefs(globalStore);

	useHead({
		titleTemplate: (pageTitle?: string) => {
			const siteName = globalConfig.value?.site_name || "Alt Media";
			return pageTitle ? `${pageTitle} | ${siteName}` : siteName;
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
