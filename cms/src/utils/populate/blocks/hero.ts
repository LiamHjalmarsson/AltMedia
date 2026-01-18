import { imagePopulate } from "../ui/image";
import { linkPopulate } from "../ui/link";

export const heroPopulate = {
	fields: ["title", "description", "colored_words", "align_content"],
	populate: {
		background: imagePopulate,
		links: linkPopulate,
	},
};
