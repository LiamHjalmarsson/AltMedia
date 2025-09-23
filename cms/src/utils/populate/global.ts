export const seoPopulate = {
	fields: ["meta_title", "meta_description", "meta_canonical_url", "prevent_index"],
	populate: {
		meta_image: {
			fields: ["url"],
		},
	},
};
