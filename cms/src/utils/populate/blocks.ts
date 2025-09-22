import { linkPopulate, iconPopulate, imagePopulate } from "./ui";
import { formPopulate } from "./forms";

export const heroPopulate = {
	fields: ["title", "description", "colored_words", "align_content", "has_form"],
	populate: {
		cover: imagePopulate,
		links: linkPopulate,
		form: formPopulate,
	},
};

export const servicePopulate = {
	fields: ["title", "slug", "description"],
	populate: { icon: iconPopulate },
};

export const offerPopulate = {
	fields: ["title", "description", "features", "is_popular", "start_price", "month_price"],
	populate: { icon: iconPopulate },
};

export const projectPopulate = {
	fields: ["title", "slug"],
	populate: { cover: imagePopulate },
};

export const articlePopulate = {
	fields: ["title", "slug", "published_date", "description"],
	populate: { cover: imagePopulate },
};
