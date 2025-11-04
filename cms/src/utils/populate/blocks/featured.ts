import { headingPopulate } from "../ui/heading";
import { iconPopulate } from "../ui/icon";
import { imagePopulate } from "../ui/image";

export const featuredBlockPopulate = {
	populate: {
		fields: ["id", "features"],
		heading: headingPopulate,
		services: {
			fields: ["title", "slug", "description"],
			populate: {
				icon: iconPopulate,
			},
		},
		projects: {
			fields: ["title", "slug"],
			populate: {
				cover: imagePopulate,
			},
		},
		articles: {
			fields: ["title", "slug", "published_date", "description"],
			populate: {
				cover: imagePopulate,
			},
		},
	},
};
