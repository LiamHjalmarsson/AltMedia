/**
 * project controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::project.project", ({ strapi }) => ({
	async find(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const results = await strapi.documents("api::project.project").findMany({
			fields: ["id", "title", "slug"],
			populate: {
				cover: {
					fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
				},
				services: {
					fields: ["title", "slug"],
				},
			},
			filters: sanitizedQuery.filters,
			sort: sanitizedQuery.sort,
			pagination: sanitizedQuery.pagination,
		});

		const sanitizedEntity = await this.sanitizeOutput(results, ctx);

		return this.transformResponse(sanitizedEntity);
	},

	async findOne(ctx) {
		const { id: slug } = ctx.params;

		const entity = await strapi.documents("api::project.project").findFirst({
			filters: { slug },
			fields: ["id", "title", "slug", "client", "date"],
			populate: {
				cover: {
					fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
				},
				services: {
					fields: ["title", "slug"],
				},
				hero: {
					fields: ["title", "description", "colored_words", "align_content"],
					populate: {
						background: {
							fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
						},
						links: {
							fields: ["label", "url", "variant", "is_external", "icon", "size", "reversed"],
						},
						color: {
							fields: ["type", "hex", "theme"],
						},
					},
				},
				introduction: {
					populate: {
						fields: ["id", "title", "subtitle", "description"],
						subservices: {
							fields: ["title", "content"],
							populate: {
								tags: {
									fields: ["title"],
								},
								service: {
									fields: ["slug"],
								},
							},
						},
					},
				},
				blocks: {
					on: {
						"block.info": {
							fields: ["id", "align_content", "content", "reverse", "image_fade"],
							populate: {
								image: {
									fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
								},
								button: {
									fields: ["label", "variant", "type", "icon"],
								},
							},
						},
						"block.full-section": {
							fields: ["id", "title", "content"],
							populate: {
								cover: {
									fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
								},
								link: {
									fields: ["label", "url", "variant", "is_external"],
								},
								color: {
									fields: ["type", "hex", "theme"],
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
			return ctx.notFound("Projektet kunde inte hittas");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));
