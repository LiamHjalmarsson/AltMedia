/**
 * contact-submission controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::contact-submission.contact-submission", ({ strapi }) => ({
	async create(ctx) {
		const data = ctx.request.body?.data ?? {};

		const name = typeof data.name === "string" ? data.name.trim() : "";

		const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";

		const message = typeof data.message === "string" ? data.message.trim() : "";

		if (!name || !email || !message) {
			return ctx.badRequest("Missing required fields", {
				missing: {
					email: !email,
					name: !name,
					message: !message,
				},
			});
		}

		const entity = await strapi.documents("api::contact-submission.contact-submission").create({
			data: {
				name,
				email,
				message,
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
						model: "contact-submission",
						entry: { name, email, message },
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
