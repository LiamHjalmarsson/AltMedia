import { buttonPopulate } from "../ui/button";
import { imagePopulate } from "../ui/image";

export const infoBlockPopulate = {
	populate: {
		fields: ["id", "align_content", "content", "reverse"],
		image: imagePopulate,
		button: buttonPopulate,
	},
};
