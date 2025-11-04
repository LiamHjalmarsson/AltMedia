/**
 * articles-page service
 */

import { factories } from "@strapi/strapi";
import { seoPopulate } from "../../../utils/populate";

export default factories.createCoreService("api::articles-page.articles-page", ({ strapi }) => ({
	async getArticlesPage() {
		return strapi.service("api::articles-page.articles-page").find({
			fields: ["id", "documentId", "title", "description", "align_content"],
			populate: {
				seo: seoPopulate,
			},
		});
	},
}));

