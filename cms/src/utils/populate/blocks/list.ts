import { headingPopulate } from "../ui/heading";
import { iconPopulate } from "../ui/icon";

export const listPopulateBlock = {
	populate: {
		fields: ["id"],
		heading: headingPopulate,
		items: {
			fields: ["title", "content"],
			populate: {
				icon: iconPopulate,
			},
		},
	},
};
