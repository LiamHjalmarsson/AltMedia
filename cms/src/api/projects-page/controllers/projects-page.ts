/**
 * projects-page controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::projects-page.projects-page", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.documents("api::projects-page.projects-page").findFirst({
			fields: ["id", "title", "description", "align_content"],
			populate: {
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
			return ctx.notFound("Projects Page not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));
