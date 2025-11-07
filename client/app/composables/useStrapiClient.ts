// composables/useStrapiClient.ts - FIXED
export const useStrapiClient = () => {
	const config = useRuntimeConfig();

	const baseURL = config.public.strapiUrl as string;

	const token = config.public.strapiToken as string | undefined;

	return $fetch.create({
		baseURL,
		headers: token ? { Authorization: `Bearer ${token}` } : {},
	});
};
