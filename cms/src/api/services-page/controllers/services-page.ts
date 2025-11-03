/**
 * services-page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::services-page.services-page", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.service("api::services-page.services-page").getServicesPage();

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

