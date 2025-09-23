/**
 * project controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::project.project", ({ strapi }) => ({
	async find(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const { results, pagination } = await strapi.service("api::project.project").getAllProjects(sanitizedQuery);

		const sanitizedEntity = await this.sanitizeOutput(results, ctx);

		return this.transformResponse(sanitizedEntity, { pagination });
	},

	async findOne(ctx) {
		await this.validateQuery(ctx);

		const sanitizedQuery = await this.sanitizeQuery(ctx);

		const { id } = ctx.params;

		const entity = await strapi.service("api::project.project").getProjectBySlug(sanitizedQuery, id);

		if (!entity) {
			return ctx.notFound("Project not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

