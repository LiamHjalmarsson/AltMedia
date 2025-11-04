import { headingPopulate } from "../ui/heading";
import { imagePopulate } from "../ui/image";

export const listPopulateBlock = {
	populate: {
		fields: ["id", "show_numbers", "layout"],
		heading: headingPopulate,
		background: imagePopulate,
		color: {
			fields: ["type", "hex", "theme"],
		},
		items: {
			fields: ["title", "content"],
			populate: {
				image: imagePopulate,
				color: {
					fields: ["type", "hex", "theme"],
				},
			},
		},
	},
};
