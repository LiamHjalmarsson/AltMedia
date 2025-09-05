/**
 * home-page service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::home-page.home-page", ({ strapi }) => ({
	async getHomePage() {
		return strapi.service("api::home-page.home-page").find({
			fields: ["id", "documentId"],
			populate: {
				hero: {
					fields: ["title", "description", "colored_words", "align_content", "has_form"],
					populate: {
						cover: {
							fields: ["alternativeText", "caption", "width", "height", "url", "provider"],
						},
						links: {
							fields: ["label", "url", "variant", "is_external"],
						},
						form: {
							fields: ["title", "description", "columns"],
							populate: {
								inputs: {
									fields: [
										"label",
										"name",
										"placeholder",
										"required",
										"type",
										"input_type",
										"rows",
										"options",
										"column_span",
									],
								},
								button: {
									fields: ["label", "variant", "type"],
								},
							},
						},
					},
				},
			},
		});
	},
}));

