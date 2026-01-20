/**
 * global-config controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::global-config.global-config", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.documents("api::global-config.global-config").findFirst({
			fields: ["id", "site_name"],
			populate: {
				favicon: {
					fields: ["url"],
				},
				navigation: {
					populate: {
						links: {
							fields: ["label", "url"],
						},
						logo: {
							fields: ["url", "alternativeText"],
						},
						cta: {
							fields: ["label", "url", "variant", "size"],
						},
					},
				},
				footer: {
					fields: ["description", "title", "has_cta"],
					populate: {
						logo: {
							fields: ["alternativeText", "formats", "height", "width", "name", "url", "provider"],
						},
						cta: {
							fields: ["title", "subtitle", "description"],
							populate: {
								buttons: {
									fields: ["label", "reversed", "icon", "type", "variant", "id"],
								},
								links: {
									fields: ["label", "reversed", "icon", "url", "variant", "id", "is_external"],
								},
								cover: {
									fields: ["url", "width", "height", "alternativeText", "mime", "id"],
								},
								color: {
									fields: ["hex", "theme", "type"],
								},
								background: {
									fields: ["hex", "theme", "type"],
								},
							},
						},
						footer_columns: {
							fields: ["title", "url"],
							populate: {
								links: {
									fields: ["label", "url", "id"],
								},
							},
						},
					},
				},
				contact: {
					fields: ["email", "phone"],
					populate: {
						social_medias: {
							fields: ["url", "title"],
							populate: {
								icon: {
									fields: ["icon_name", "is_image", "id"],
								},
							},
						},
					},
				},
				seo: {
					fields: ["meta_title", "meta_description", "meta_canonical_url", "prevent_index"],
					populate: {
						meta_image: {
							fields: ["url", "width", "height", "alternativeText"],
						},
					},
				},
			},
		});

		if (!entity) {
			return ctx.notFound("Global configuration not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));
