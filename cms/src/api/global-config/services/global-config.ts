/**
 * global-config service
 */

import { factories } from "@strapi/strapi";
import { iconPopulate, imagePopulate, linkPopulate, seoPopulate } from "../../../utils/populate";
import { buttonPopulate } from "../../../utils/populate/ui/button";
import { colorPopulate } from "../../../utils/populate/styles/color";

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

const menuLink = {
	fields: ["label", "url"],
};

const navigationPopulate = {
	populate: {
		logo: imagePopulate,
		links: menuLink,
	},
};

const footerColumnPopulate = {
	fields: ["title", "url"],
	populate: {
		links: menuLink,
	},
};

const footerPopulate = {
	populate: {
		cta: {
			fields: ["title", "subtitle", "description"],
			populate: {
				buttons: buttonPopulate,
				links: linkPopulate,
				cover: imagePopulate,
				color: colorPopulate,
				background: colorPopulate,
			},
		},
		footer_columns: footerColumnPopulate,
	},
};

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
