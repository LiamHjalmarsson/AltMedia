/**
 * analysis-request controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::analysis-request.analysis-request", ({ strapi }) => ({
	async create(ctx) {
		const data = ctx.request.body?.data || {};

		const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";

		const url = typeof data.url === "string" ? data.url.trim() : "";

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

		const webhookSecret = process.env.WEBHOOK_SECRET;

		if (!webhookSecret) {
			strapi.log.warn("WEBHOOK_SECRET is not set; skipping Discord notification.");
		} else {
			try {
				const baseUrl = strapi.config.get("server.url") || "http://localhost:1337";

				const res = await fetch(`${baseUrl}/api/discord`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${webhookSecret}`,
					},
					body: JSON.stringify({
						model: "analysis-request",
						entry: { url, email },
					}),
				});

				if (!res.ok) {
					const text = await res.text().catch(() => "");

					strapi.log.error(`Discord notify failed: ${res.status} ${res.statusText} ${text}`);
				}
			} catch (err) {
				strapi.log.error("Failed to send Discord notification:", err);
			}
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));
