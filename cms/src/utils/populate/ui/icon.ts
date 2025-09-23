import { imagePopulate } from "./image";

export const iconPopulate = {
	fields: ["icon_name", "is_image"],
	populate: {
		image: imagePopulate,
	},
};
