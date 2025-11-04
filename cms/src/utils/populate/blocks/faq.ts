import { headingPopulate } from "../ui/heading";
import { imagePopulate } from "../ui/image";

export const faqBlockPopulate = {
	populate: {
		fields: ["id"],
		heading: headingPopulate,
		items: {
			fields: ["question", "answer"],
		},
		image: imagePopulate,
	},
};
