import { imagePopulate } from "../ui/image";

export const articlePopulate = {
	fields: ["title", "slug", "published_date", "description"],
	populate: {
		cover: imagePopulate,
	},
};
