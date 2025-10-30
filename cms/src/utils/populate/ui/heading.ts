import { linkPopulate } from "./link";

export const headingPopulate = {
	fields: ["title", "align_content", "has_link", "description"],
	populate: {
		link: linkPopulate,
	},
};
