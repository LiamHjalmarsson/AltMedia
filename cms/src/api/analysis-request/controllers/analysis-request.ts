/**
 * analysis-request controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::analysis-request.analysis-request", ({ strapi }) => ({
	async create(ctx) {
		const { url, email } = ctx.request.body?.data || {};

		if (!url || !email) {
			return ctx.badRequest("Both email and url are required.", {
				missing: {
					email: !email,
					url: !url,
				},
			});
		}

		const entity = await strapi.documents("api::analysis-request.analysis-request").create({
			data: {
				email,
				url,
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
					model: "analysis-request",
					entry: { url, email },
				}),
			});
		} catch (err) {
			strapi.log.error("Failed to send Discord notification:", err);
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

