import { headingPopulate } from "../ui/heading";
import { imagePopulate } from "../ui/image";

export const listPopulateBlock = {
	populate: {
		fields: ["id"],
		heading: headingPopulate,
		items: {
			fields: ["title", "content"],
			populate: {
				image: imagePopulate,
			},
		},
	},
};
