export const introductionBlockPopulate = {
	populate: {
		fields: ["id", "title", "subtitle", "description"],
		subservices: {
			fields: ["title", "content"],
			populate: {
				tags: {
					fields: ["title"],
				},
				service: {
					fields: ["slug"],
				},
			},
		},
	},
};
