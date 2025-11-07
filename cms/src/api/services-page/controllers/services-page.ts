import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::services-page.services-page", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.documents("api::services-page.services-page").findFirst({
			fields: ["id", "title", "description", "align_content"],
			populate: ["seo"],
		});

		if (!entity) {
			return ctx.notFound("Services Page not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

