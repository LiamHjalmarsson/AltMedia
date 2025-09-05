/**
 * global-config controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::global-config.global-config", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.service("api::global-config.global-config").find({
			fields: ["id", "site_name"],
			populate: {
				favicon: {
					fields: ["url"],
				},
				navigation: {
					populate: {
						logo: {
							fields: ["name", "width", "height", "url", "provider"],
						},
						links: {
							fields: ["label", "url"],
						},
					},
				},
				footer: {
					populate: {
						cta: {
							fields: ["title", "description"],
							populate: {
								buttons: {
									fields: ["label", "variant", "type"],
								},
								links: {
									fields: ["label", "url", "variant", "is_external"],
								},
							},
						},
						footer_columns: {
							fields: ["title", "url"],
							populate: {
								links: {
									fields: ["label", "url"],
								},
							},
						},
					},
				},
				seo: {
					fields: ["meta_title", "meta_description", "meta_cannical_url", "prevent_index"],
					populate: {
						meta_image: {
							fields: ["url"],
						},
					},
				},
				contact: {
					fields: ["email", "phone"],
					populate: {
						social_medias: {
							fields: ["url"],
							populate: {
								icon: {
									fields: ["icon_name", "is_image"],
									populate: {
										image: {
											fields: ["formats", "name", "width", "height", "url", "provider"],
										},
									},
								},
							},
						},
					},
				},
			},
		});

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

