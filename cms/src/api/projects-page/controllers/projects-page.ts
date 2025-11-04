/**
 * projects-page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::projects-page.projects-page", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.service("api::projects-page.projects-page").getProjectsPage();

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

