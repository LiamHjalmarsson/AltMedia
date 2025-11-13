interface WebhookEntry {
	name: string;
	email: string;
	phone: string | null;
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

		if (model !== "project-request") {
			strapi.log.info(`Ignored webhook for model: ${model}`);

			return ctx.send({ ok: true, ignored: true });
		}

		const fields = buildProjectRequestFields(entry);

		const adminUrl = entry.documentId
			? `${process.env.STRAPI_ADMIN_URL || "http://localhost:1337"}/admin/content-manager/collection-types/pi::project-request.project-request/${entry.documentId}`
			: null;

		const payload = {
			username: "Project Requests",
			content: `📩 *${event.replace("entry.", "").toUpperCase()}* från **${entry.name || "Okänd"}**`,
			embeds: [
				{
					title: "Ny projektförfrågan",
					description: `**Namn:** ${entry.name || "—"}\n` + `**E-post:** ${entry.email || "—"}\n`,
					color: 0x57f287,
					timestamp: new Date().toISOString(),
					fields,
					footer: adminUrl ? { text: "Öppna i Strapi Admin", icon_url: undefined } : undefined,
					url: adminUrl ?? undefined,
				},
			],
		};

		try {
			const res = await fetch(process.env.DISCORD_WEBHOOK_URL as string, {
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
