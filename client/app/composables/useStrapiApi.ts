export const useStrapiApi = () => {
	const { find, findOne } = useStrapi();

	const getAll = async <T>(endpoint: string, query?: Record<string, any>) => {
		const result = await find<T>(endpoint, query);

		return result.data;
	};

	const getBySlug = async <T>(endpoint: string, slug: string) => {
		const result = await findOne<T>(endpoint, slug);

		return result.data;
	};

	return { getAll, getBySlug };
};
