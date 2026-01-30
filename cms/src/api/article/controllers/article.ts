/**
 * article controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::article.article", ({ strapi }) => ({
	async find(ctx) {
		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const results = await strapi.documents("api::article.article").findMany({
			fields: ["id", "title", "slug", "description", "published_date", "reading_time_min"],
			populate: {
				cover: {
					fields: ["alternativeText", "formats", "height", "width", "url", "provider", "mime"],
				},
				services: {
					fields: ["id", "title", "slug", "description"],
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

		const entity = await strapi.documents("api::article.article").findFirst({
			filters: { slug },
			fields: [
				"id",
				"title",
				"slug",
				"description",
				"published_date",
				"reading_time_min",
				"table_of_contents_title",
				"display_table_of_contents",
				"content",
			],
			populate: {
				cover: {
					fields: ["alternativeText", "formats", "height", "width", "url", "provider", "mime"],
				},
				services: {
					fields: ["id", "title", "slug", "description"],
				},
				blocks: {
					on: {
						"block.introduction": {
							fields: ["content"],
							populate: {
								heading: {
									fields: ["align_content", "title"],
								},
							},
						},
						"block.content-section": {
							fields: ["anchor", "body", "title", "id"],
						},
						"ui.divider": { populate: "*" },
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
			return ctx.notFound("Artikeln kunde inte hittas");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));
