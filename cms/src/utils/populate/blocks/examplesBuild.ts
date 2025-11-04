import { headingPopulate } from "../ui/heading";
import { iconPopulate } from "../ui/icon";
import { linkPopulate } from "../ui/link";

export const examplesBuildBlockPopulate = {
	populate: {
		fields: ["id"],
		heading: headingPopulate,
		button: linkPopulate,
		items: {
			fields: ["title", "description"],
			populate: {
				icon: iconPopulate,
				subservices: {
					populate: {
						fields: ["title"],
					},
				},
			},
		},
	},
};
