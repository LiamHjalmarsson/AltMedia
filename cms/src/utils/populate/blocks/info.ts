import { imagePopulate } from "../ui/image";
import { linkPopulate } from "../ui/link";

export const infoBlockPopulate = {
	populate: {
		fields: ["id", "title", "align_content", "content", "reverse"],
		image: imagePopulate,
		button: linkPopulate,
	},
};
