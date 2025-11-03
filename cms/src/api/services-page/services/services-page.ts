/**
 * services-page service
 */

import { factories } from "@strapi/strapi";
import { seoPopulate } from "../../../utils/populate";

export default factories.createCoreService("api::services-page.services-page", ({ strapi }) => ({
	async getServicesPage() {
		return strapi.service("api::services-page.services-page").find({
			fields: ["id", "documentId", "title", "description", "align_content"],
			populate: {
				seo: seoPopulate,
			},
		});
	},
}));

