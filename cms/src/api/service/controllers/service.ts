/**
 * service controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::service.service", ({ strapi }) => ({
	async find(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const results = await strapi.documents("api::service.service").findMany({
			fields: ["id", "title", "slug", "description", "content", "order"],
			populate: {
				icon: {
					fields: ["icon_name", "is_image"],
					populate: {
						image: {
							fields: ["url", "alternativeText", "formats", "width", "height", "mime", "provider"],
						},
					},
				},
				image: {
					fields: ["url", "alternativeText", "formats", "width", "height", "mime", "provider"],
				},
				subservices: {
					fields: ["id", "title", "slug", "content", "has_page"],
					populate: {
						tags: {
							fields: ["title"],
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
			filters: sanitizedQuery.filters,
			sort: sanitizedQuery.sort,
			pagination: sanitizedQuery.pagination,
		});

		const sanitizedEntity = await this.sanitizeOutput(results, ctx);

		return this.transformResponse(sanitizedEntity);
	},

	async findOne(ctx) {
		const { id: slug } = ctx.params;

		const entity = await strapi.documents("api::service.service").findFirst({
			filters: { slug },
			fields: ["id", "title", "slug", "description", "content", "order"],
			populate: {
				icon: {
					fields: ["icon_name", "is_image"],
					populate: {
						image: {
							fields: ["url", "alternativeText", "formats", "width", "height", "mime", "provider"],
						},
					},
				},
				image: {
					fields: ["url", "alternativeText", "formats", "width", "height", "mime", "provider"],
				},
				subservices: {
					fields: ["id", "title", "slug", "content"],
					populate: {
						tags: {
							fields: ["title"],
						},
					},
				},
				articles: {
					fields: ["id", "title", "slug", "published_date", "description"],
					populate: {
						cover: {
							fields: ["url", "alternativeText", "formats", "width", "height", "mime"],
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
			return ctx.notFound("Service not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

