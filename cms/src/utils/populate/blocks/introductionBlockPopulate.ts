export const introductionBlockPopulate = {
	populate: {
		fields: ["id", "title", "subtitle", "description"],
		sub_services: {
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
