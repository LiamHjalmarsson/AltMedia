interface WebhookEntry {
	name: string;
	email: string;
	phone: string | null;
	message?: string;
	data: Record<string, unknown>;
	documentId?: string;
}

interface WebhookBody {
	event?: string;
	model?: string;
	entry?: WebhookEntry;
}

interface StrapiRequest {
	headers: Record<string, string | undefined>;
	body?: WebhookBody;
}

interface StrapiContext {
	request: StrapiRequest;
	send: (response: { ok: boolean; [key: string]: unknown }) => void;
	unauthorized: (message: string) => void;
	internalServerError: (message: string) => void;
}

export default {
	async notify(ctx: StrapiContext) {
		const auth: string = ctx.request.headers.authorization;

		const expected = `Bearer ${process.env.WEBHOOK_SECRET}`;

		if (auth !== expected) {
			return ctx.unauthorized("Invalid webhook secret");
		}

		const { event, model, entry } = ctx.request.body || {};

		if (!event || !model || !entry) {
			strapi.log.warn("Webhook payload saknar event, model eller entry");

			return ctx.send({ ok: true, skipped: true });
		}

		const fields = buildProjectRequestFields(entry);

		const webhookUrl =
			model === "contact-submission" ? process.env.DISCORD_CONTACT_WEBHOOK_URL : process.env.DISCORD_WEBHOOK_URL;

		const payload = {
			username: "Requests",
			content: `📩 *${event.replace("entry.", "").toUpperCase()}* från **${entry.name || "Okänd"}**`,
			embeds: [
				{
					title: "Ny förfrågan i " + model,
					description: `**Namn:** ${entry.name || "—"}\n` + `**E-post:** ${entry.email || "—"}\n`,
					color: 0x57f287,
					timestamp: new Date().toISOString(),
					fields,
				},
			],
		};

		try {
			const res = await fetch(webhookUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				const text = await res.text();

				strapi.log.error("Discord error:", res.status, text);

				return ctx.internalServerError("Discord webhook error");
			}

			return ctx.send({ ok: true });
		} catch (err) {
			strapi.log.error("Discord webhook failed:", err);

			return ctx.internalServerError("Failed to send to Discord");
		}
	},
};

function buildProjectRequestFields(entry: WebhookEntry) {
	const fields = [];

	for (const [key, value] of Object.entries(entry.data || {})) {
		fields.push({
			name: key,
			value:
				typeof value === "object"
					? "```json\n" + JSON.stringify(value, null, 2).slice(0, 1000) + "\n```"
					: String(value ?? "—"),
			inline: false,
		});
	}

	return fields;
}
