import type { SeoComponent } from "~/types/components/seo/seo";

export function useAppHead(seo?: SeoComponent) {
	const globalStore = useGlobalStore();

	const { globalConfigData, seo: defaultSeo } = storeToRefs(globalStore);

	const resolvedSeo = computed(() => seo || defaultSeo.value);

	const fallbackTitle = globalConfigData.value?.site_name || "Alt Media";

	const fallbackDesc = "Digital byrå som skapar varumärken, design och teknik som växer.";

	const metaTitle = computed(() => resolvedSeo.value?.meta_title || fallbackTitle);

	const metaDesc = computed(() => resolvedSeo.value?.meta_description || fallbackDesc);

	const metaImage = computed(() => resolvedSeo.value?.meta_image?.url || globalConfigData.value?.seo.meta_image?.url);

	const canonicalUrl = computed(
		() => resolvedSeo.value?.meta_canonical_url || globalConfigData.value?.seo.meta_canonical_url,
	);

	// useHead({
	// 	title: metaTitle,
	// 	link: canonicalUrl.value
	// 		? [
	// 				{
	// 					rel: "canonical",
	// 					href: canonicalUrl.value,
	// 				},
	// 		  ]
	// 		: [],
	// });

	useSeoMeta({
		title: metaTitle,
		description: metaDesc,

		ogTitle: metaTitle,
		ogDescription: metaDesc,
		ogImage: metaImage,
		ogUrl: canonicalUrl,
		ogType: "website",

		twitterTitle: resolvedSeo.value?.meta_title,
		twitterDescription: resolvedSeo.value?.meta_description,
		twitterImage: metaImage,
		twitterCard: "summary_large_image",
	});
}
