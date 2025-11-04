/**
 * projects-page service
 */

import { factories } from "@strapi/strapi";
import { seoPopulate } from "../../../utils/populate";

export default factories.createCoreService("api::projects-page.projects-page", ({ strapi }) => ({
	async getProjectsPage() {
		return strapi.service("api::projects-page.projects-page").find({
			fields: ["id", "documentId", "title", "description", "align_content"],
			populate: {
				seo: seoPopulate,
			},
		});
	},
}));

