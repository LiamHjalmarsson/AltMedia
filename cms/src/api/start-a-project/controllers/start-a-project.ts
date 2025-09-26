/**
 * start-a-project controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::start-a-project.start-a-project", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.service("api::start-a-project.start-a-project").getStartAProject();

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

