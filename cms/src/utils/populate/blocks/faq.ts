import { headingPopulate } from "../ui/heading";
import { iconPopulate } from "../ui/icon";

export const faqBlockPopulate = {
	populate: {
		fields: ["id"],
		heading: headingPopulate,
		items: {
			fields: ["question", "answer"],
		},
		icon: iconPopulate,
	},
};
