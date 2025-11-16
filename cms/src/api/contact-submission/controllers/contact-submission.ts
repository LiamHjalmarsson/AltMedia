/**
 * contact-submission controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::contact-submission.contact-submission", ({ strapi }) => ({
	async create(ctx) {
		const { name, email, message } = ctx.request.body?.data || {};

		if (!name || !email || !message) {
			return ctx.badRequest("Missing required fields");
		}

		const entity = await strapi.documents("api::contact-submission.contact-submission").create({
			data: {
				name,
				email,
				message,
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
					entry: { name, email, message },
				}),
			});
		} catch (err) {
			strapi.log.error("Failed to send Discord notification:", err);
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

