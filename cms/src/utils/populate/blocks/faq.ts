import { headingPopulate } from "../ui/heading";

export const faqBlockPopulate = {
	populate: {
		fields: ["id"],
		heading: headingPopulate,
		items: {
			fields: ["question", "answer"],
		},
	},
};
