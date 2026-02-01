export default defineNuxtPlugin(() => {
	const globalStore = useGlobalStore();

	const { globalConfigData } = storeToRefs(globalStore);

	useHead({
		titleTemplate: (pageTitle?: string) => {
			const siteName = globalConfigData.value?.site_name || "Alt Media";
			return pageTitle ? `${pageTitle} | ${siteName}` : siteName;
		},
		htmlAttrs: { lang: "sv" },
		link: computed(() =>
			globalConfigData.value?.favicon?.url
				? [
						{
							rel: "icon",
							type: "image/png",
							href: globalConfigData.value.favicon.url,
						},
					]
				: [],
		),
	});
});
