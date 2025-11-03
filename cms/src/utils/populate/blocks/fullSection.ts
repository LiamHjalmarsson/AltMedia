export const fullSectionPopulateBlock = {
	populate: {
		fields: ["id", "title", "content"],
		cover: {
			fields: ["formats", "name", "width", "height", "url", "provider"],
		},
		link: {
			fields: ["label", "url", "variant", "is_external"],
		},
		color: {
			fields: ["type", "hex", "theme"],
		},
	},
};
