/**
 * offer controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::offer.offer", ({ strapi }) => ({
	async find(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const { results, pagination } = await strapi.service("api::offer.offer").getAllOffers(sanitizedQuery);

		const sanitizedEntity = await this.sanitizeOutput(results, ctx);

		return this.transformResponse(sanitizedEntity, { pagination });
	},

	async findOne(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const { id } = ctx.params;

		const entity = await strapi.service("api::offer.offer").getOfferBySlug(sanitizedQuery, id);

		if (!entity) {
			return ctx.notFound("Offer not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

