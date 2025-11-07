export const ctaBlockPopulate = {
	populate: {
		fields: ["id", "title", "description"],
		buttons: { fields: ["label", "variant", "type"] },
		links: { fields: ["label", "url", "variant", "is_external"] },
	},
};
