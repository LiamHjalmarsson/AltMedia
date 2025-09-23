/**
 * global-config service
 */

import { factories } from "@strapi/strapi";
import { contactPopulate, footerPopulate, navigationPopulate, seoPopulate } from "../../../utils/populate";

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

