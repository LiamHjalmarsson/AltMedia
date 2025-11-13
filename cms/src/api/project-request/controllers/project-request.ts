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

		try {
			await fetch(`${strapi.config.get("server.url") || "http://localhost:1337"}/api/discord`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.WEBHOOK_SECRET}`,
				},
				body: JSON.stringify({
					model: "project-request",
					entry: { name, email, phone, data: data, documentId: entity.documentId },
				}),
			});
		} catch (err) {
			strapi.log.error("Failed to send Discord notification:", err);
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

