/**
 * global-config controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::global-config.global-config", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.service("api::global-config.global-config").getGlobalConfig();

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

