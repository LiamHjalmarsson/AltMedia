/**
 * subservice controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::subservice.subservice", ({ strapi }) => ({
	async find(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const results = await strapi.documents("api::subservice.subservice").findMany({
			fields: ["id", "title", "slug", "content", "price_once"],
			populate: {
				icon: {
					fields: ["icon_name", "is_image"],
					populate: {
						image: {
							fields: ["url", "alternativeText", "formats", "width", "height", "mime", "provider"],
						},
					},
				},
				tags: { fields: ["id", "title"] },
				service: { fields: ["id", "title", "slug"] },
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

		const entity = await strapi.documents("api::subservice.subservice").findFirst({
			filters: { slug },
			fields: ["id", "title", "slug", "content", "price_once"],
			populate: {
				tags: { fields: ["id", "title"] },
				service: { fields: ["id", "title", "slug"] },
				icon: {
					fields: ["icon_name", "is_image"],
					populate: {
						image: {
							fields: ["url", "alternativeText", "formats", "width", "height", "mime", "provider"],
						},
					},
				},
				hero: {
					fields: ["title", "description", "colored_words", "align_content"],
					populate: {
						background: {
							fields: ["url", "alternativeText", "formats", "width", "height", "mime", "provider"],
						},
						color: {
							fields: ["type", "hex", "theme"],
						},
					},
				},
				introduction: {
					fields: ["id", "title", "subtitle", "description"],
					populate: {
						subservices: {
							fields: ["title", "slug"],
							populate: {
								tags: { fields: ["title"] },
								service: { fields: ["slug"] },
							},
						},
					},
				},
				blocks: {
					on: {
						"block.list": {
							fields: ["id", "show_numbers", "layout"],
							populate: {
								heading: {
									fields: ["title", "align_content", "has_link", "description"],
									populate: {
										link: {
											fields: [
												"label",
												"url",
												"variant",
												"is_external",
												"icon",
												"size",
												"reversed",
											],
										},
									},
								},
								background: {
									fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
								},
								color: {
									fields: ["type", "hex", "theme"],
								},
								items: {
									fields: ["title", "content"],
									populate: {
										image: {
											fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
										},
									},
								},
							},
						},
						"block.info": {
							fields: ["id", "align_content", "content", "reverse", "image_fade"],
							populate: {
								image: {
									fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
								},
								button: {
									fields: ["label", "variant", "type", "icon", "size", "reversed"],
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
							fields: ["url", "width", "height", "alternativeText"],
						},
					},
				},
			},
		});

		if (!entity) {
			return ctx.notFound("Subservice not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));
