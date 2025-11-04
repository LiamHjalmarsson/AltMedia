/**
 * articles-page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::articles-page.articles-page", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.service("api::articles-page.articles-page").getArticlesPage();

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

