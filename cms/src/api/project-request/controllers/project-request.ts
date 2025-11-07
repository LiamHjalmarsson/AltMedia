/**
 * project-request controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::project-request.project-request", ({ strapi }) => ({
	async create(ctx) {
		const { name, email, phone, data } = ctx.request.body?.data || {};

		if (!name || !email) {
			return ctx.badRequest("Missing required fields: name and email");
		}

		const entity = await strapi.documents("api::project-request.project-request").create({
			data: {
				name,
				email,
				phone,
				data,
				appending: "new",
			},
		});

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

