/**
 * project-request controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::project-request.project-request", ({ strapi }) => ({
	async create(ctx) {
		const body = ctx.request.body?.data ?? {};

		const name = typeof body.name === "string" ? body.name.trim() : "";

		const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

		const phoneRaw = typeof body.phone === "string" ? body.phone.trim() : "";

		const phone = phoneRaw.length ? phoneRaw : null;

		const data = body.data ?? null;

		if (!name || !email) {
			return ctx.badRequest("Missing required fields: name and email", {
				missing: { name: !name, email: !email },
			});
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
						event: "create",
						model: "project-request",
						entry: { name, email, phone, data, documentId: entity.documentId },
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
