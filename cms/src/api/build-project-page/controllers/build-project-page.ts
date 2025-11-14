/**
 * build-project-page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::build-project-page.build-project-page", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.documents("api::build-project-page.build-project-page").findFirst({
			fields: ["id", "title", "description", "show_summary_panel", "title"],
			populate: {
				steps: {
					fields: ["id", "title", "subtitle", "description", "type", "clickable_relations"],
					populate: {
						services: {
							fields: ["id", "title"],
						},
						subservices: {
							fields: ["id", "title"],
						},
						questions: {
							fields: ["id", "help_text", "title", "type"],
							populate: {
								options: {
									fields: ["id", "label", "value", "is_static"],
								},
								conditional: {
									fields: ["id", "trigger_value", "placeholder", "label", "type"],
								},
							},
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

