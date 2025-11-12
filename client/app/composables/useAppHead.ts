import type { Seo } from "~/types";

export function useAppHead(seo?: Seo) {
	const globalStore = useGlobalStore();

	const { globalConfig, seo: defaultSeo } = storeToRefs(globalStore);

	const resolvedSeo = computed(() => seo || defaultSeo.value);

	useSeoMeta({
		title: resolvedSeo.value?.meta_title || globalConfig.value?.site_name || "Alt Media",
		description:
			resolvedSeo.value?.meta_description || "Digital byrå som skapar varumärken, design och teknik som växer.",
		ogTitle: resolvedSeo.value?.meta_title,
		ogDescription: resolvedSeo.value?.meta_description,
		ogImage: resolvedSeo.value?.meta_image?.url || globalConfig.value?.seo.meta_image?.url,
		ogUrl: resolvedSeo.value?.meta_canonical_url || globalConfig.value?.seo.meta_canonical_url,
		twitterTitle: resolvedSeo.value?.meta_title,
		twitterDescription: resolvedSeo.value?.meta_description,
		twitterImage: resolvedSeo.value?.meta_image?.url || globalConfig.value?.seo.meta_image?.url,
		twitterCard: "summary_large_image",
	});
}
