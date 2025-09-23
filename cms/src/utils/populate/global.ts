import { iconPopulate } from "./ui/icon";
import { imagePopulate } from "./ui/image";
import { linkPopulate } from "./ui/link";

export const seoPopulate = {
	fields: ["meta_title", "meta_description", "meta_canonical_url", "prevent_index"],
	populate: {
		meta_image: {
			fields: ["url"],
		},
	},
};

export const contactPopulate = {
	fields: ["email", "phone"],
	populate: {
		social_medias: {
			fields: ["url"],
			populate: {
				icon: iconPopulate,
			},
		},
	},
};

export const navigationPopulate = {
	populate: {
		logo: imagePopulate,
		links: {
			fields: ["label", "url"],
		},
	},
};

export const footerPopulate = {
	populate: {
		cta: {
			fields: ["title", "description"],
			populate: {
				buttons: {
					fields: ["label", "variant", "type"],
				},
				links: linkPopulate,
			},
		},
		footer_columns: {
			fields: ["title", "url"],
			populate: {
				links: {
					fields: ["label", "url"],
				},
			},
		},
	},
};
