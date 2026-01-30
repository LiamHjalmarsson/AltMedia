/**
 * page controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::page.page", ({ strapi }) => ({
	async find(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const results = await strapi.documents("api::page.page").findMany({
			fields: ["id", "title", "slug"],
			filters: sanitizedQuery.filters,
			sort: sanitizedQuery.sort,
			pagination: sanitizedQuery.pagination,
		});

		const sanitizedEntity = await this.sanitizeOutput(results, ctx);

		return this.transformResponse(sanitizedEntity);
	},

	async findOne(ctx) {
		const { id: slug } = ctx.params;

		const entity = await strapi.documents("api::page.page").findFirst({
			filters: { slug },
			fields: ["id", "title", "slug"],
			populate: {
				seo: {
					fields: ["meta_title", "meta_description", "meta_canonical_url", "prevent_index"],
					populate: {
						meta_image: {
							fields: ["alternativeText", "width", "url", "provider"],
						},
					},
				},
				blocks: {
					on: {
						"block.full-section": {
							populate: {
								fields: ["id", "title", "content"],
								cover: {
									fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
								},
								link: {
									fields: ["label", "url", "variant", "is_external", "size"],
								},
								color: {
									fields: ["type", "hex", "theme"],
								},
							},
						},
						"block.hero": {
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
						"block.info": {
							populate: {
								fields: ["id", "align_content", "content", "reverse", "image_fade"],
								image: {
									fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
								},
								button: {
									fields: ["label", "variant", "type", "icon"],
								},
							},
						},
						"block.story-split": {
							populate: {
								fields: ["id", "title", "content", "reverse"],
								images: {
									fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
								},
							},
						},
						"block.list": {
							populate: {
								fields: ["id", "show_numbers", "layout"],
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
						"sections.introduction": {
							populate: {
								fields: ["id", "title", "subtitle", "description"],
							},
						},
					},
				},
			},
		});

		if (!entity) {
			return ctx.notFound("Page not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));
