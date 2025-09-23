/**
 * global-config service
 */

import { factories } from "@strapi/strapi";
import { iconPopulate, imagePopulate, linkPopulate, seoPopulate } from "../../../utils/populate";
import { buttonPopulate } from "../../../utils/populate/ui/button";

export default factories.createCoreService("api::global-config.global-config", ({ strapi }) => ({
	async getGlobalConfig() {
		return strapi.service("api::global-config.global-config").find({
			fields: ["id", "documentId", "site_name"],
			populate: {
				favicon: {
					fields: ["url"],
				},
				navigation: navigationPopulate,
				footer: footerPopulate,
				seo: seoPopulate,
				contact: contactPopulate,
			},
		});
	},
}));

const contactPopulate = {
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

const navigationPopulate = {
	populate: {
		logo: imagePopulate,
		links: {
			fields: ["label", "url"],
		},
	},
};

const footerPopulate = {
	populate: {
		cta: {
			fields: ["title", "description"],
			populate: {
				buttons: buttonPopulate,
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

