/**
 * service controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::service.service", ({ strapi }) => ({
	async find(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const { results, pagination } = await strapi.service("api::service.service").getAllServices(sanitizedQuery);

		const sanitizedEntity = await this.sanitizeOutput(results, ctx);

		return this.transformResponse(sanitizedEntity, { pagination });
	},

	async findOne(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const { id } = ctx.params;

		const entity = await strapi.service("api::service.service").getServiceBySlug(sanitizedQuery, id);

		if (!entity) {
			return ctx.notFound("Service not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

