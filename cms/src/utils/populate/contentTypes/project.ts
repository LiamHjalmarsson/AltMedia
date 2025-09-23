import { imagePopulate } from "../ui/image";

export const projectPopulate = {
	fields: ["title", "slug"],
	populate: { cover: imagePopulate },
};
