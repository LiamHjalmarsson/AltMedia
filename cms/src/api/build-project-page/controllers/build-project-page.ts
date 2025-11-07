/**
 * build-project-page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::build-project-page.build-project-page", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.documents("api::build-project-page.build-project-page").findFirst({
			fields: ["id", "title", "description", "slug"],
			populate: {
				steps: {
					fields: ["title", "description"],
					populate: {
						questions: {
							fields: ["label", "type", "options"],
						},
						related_services: {
							fields: ["id", "title"],
						},
						related_subservices: {
							fields: ["id", "title"],
						},
					},
				},
				seo: {
					fields: ["meta_title", "meta_description", "meta_canonical_url", "prevent_index"],
					populate: {
						meta_image: {
							fields: ["alternativeText", "width", "url", "provider"],
						},
					},
				},
			},
		});

		if (!entity) {
			return ctx.notFound("Build Project Page not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

