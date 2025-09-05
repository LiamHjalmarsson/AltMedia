/**
 * home-page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::home-page.home-page", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.service("api::home-page.home-page").getHomePage();

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

