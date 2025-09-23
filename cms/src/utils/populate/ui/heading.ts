import { linkPopulate } from "./link";

export const headingPopulate = {
	fields: ["title", "align_content", "has_link"],
	populate: {
		link: linkPopulate,
	},
};
