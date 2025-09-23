import { formPopulate } from "../forms/form";
import { imagePopulate } from "../ui/image";
import { linkPopulate } from "../ui/link";

export const heroPopulate = {
	fields: ["title", "description", "colored_words", "align_content", "has_form"],
	populate: {
		cover: imagePopulate,
		links: linkPopulate,
		form: formPopulate,
	},
};
