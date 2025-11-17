interface Build {
	name: string;
	email: string;
	phone: string | null;
	data: Record<string, string | number | boolean | object | null>;
	documentId?: string;
}

interface Contact {
	name: string;
	email: string;
	message: string;
}

interface Analysis {
	email: string;
	url: string;
}

export type WebhookEntry = Build | Contact | Analysis;

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

		const allowedModels = ["project-request", "contact-submission", "analysis-request"];

		if (!allowedModels.includes(model)) {
			strapi.log.info(`Ignored webhook for model: ${model}`);

			return ctx.send({ ok: true, ignored: true });
		}

		const webhookUrl = resolveWebhookUrl(model);

		const fields = buildFields(entry);

		const payload = {
			username: "Requests",
			content: `📩 ${event.toUpperCase()} (${model})`,
			embeds: [
				{
					title: `Ny förfrågan (${model})`,
					description: extractDescription(entry),
					color: 0x57f287,
					timestamp: new Date().toISOString(),
					fields,
				},
			],
		};

		console.log(payload);

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

function resolveWebhookUrl(model: string): string {
	switch (model) {
		case "contact-submission":
			return process.env.DISCORD_CONTACT_WEBHOOK_URL || "";
		case "project-request":
			return process.env.DISCORD_WEBHOOK_URL || "";
		case "analysis-request":
			return process.env.DISCORD_ANALYSIS_WEBHOOK_URL || "";
		default:
			return process.env.DISCORD_WEBHOOK_URL || "";
	}
}

function buildFields(entry: WebhookEntry) {
	if ("data" in entry && entry.data) {
		return Object.entries(entry.data).map(([key, value]) => ({
			name: key,
			value:
				typeof value === "object"
					? "```json\n" + JSON.stringify(value, null, 2) + "\n```"
					: String(value ?? "—"),
			inline: false,
		}));
	}

	return [];
}

function extractDescription(entry: WebhookEntry): string {
	if ("message" in entry) {
		return `**Namn:** ${entry.name}\n**E-post:** ${entry.email}\n**Meddelande:** ${entry.message}`;
	}

	if ("url" in entry) {
		return `**E-post:** ${entry.email}\n**URL:** ${entry.url}`;
	}

	return `**Namn:** ${entry.name}\n**E-post:** ${entry.email}\n**Telefon:** ${entry.phone}`;
}
