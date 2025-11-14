/**
 * contact controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::contact.contact", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.documents("api::contact.contact").findFirst({
			fields: ["id", "title", "description"],
			populate: {
				color: {
					fields: ["hex", "theme", "type"],
				},
				cover: {
					fields: ["url", "formats", "width", "height", "alternativeText", "mime"],
				},
				form: {
					fields: ["title", "description", "columns"],
					populate: {
						inputs: {
							fields: [
								"label",
								"name",
								"placeholder",
								"required",
								"type",
								"input_type",
								"rows",
								"options",
								"column_span",
							],
						},
						button: {
							fields: ["label", "variant", "type", "icon"],
						},
					},
				},
				seo: {
					fields: ["meta_title", "meta_description", "meta_canonical_url", "prevent_index"],
					populate: {
						meta_image: {
							fields: ["alternativeText", "width", "url", "provider"],
						},
					},
				},
			},
		});

		if (!entity) {
			return ctx.notFound("Contact Page not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

