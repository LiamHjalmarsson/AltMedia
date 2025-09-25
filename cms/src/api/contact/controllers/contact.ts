/**
 * contact controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::contact.contact", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.service("api::contact.contact").getContactPage();

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

