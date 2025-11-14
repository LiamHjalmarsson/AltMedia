/**
 * home-page controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::home-page.home-page", ({ strapi }) => ({
	async find(ctx) {
		const entity = await strapi.documents("api::home-page.home-page").findFirst({
			fields: ["id", "has_form"],
			populate: {
				hero: {
					fields: ["title", "description", "colored_words", "align_content", "badge"],
					populate: {
						background: {
							fields: ["url", "formats", "width", "height", "alternativeText", "mime"],
						},
						links: {
							fields: ["label", "url", "variant", "is_external", "icon", "size", "reversed"],
						},
					},
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
				blocks: {
					on: {
						"block.featured": {
							populate: {
								fields: ["id", "features"],
								heading: {
									fields: ["title", "align_content", "has_link", "description"],
									populate: {
										link: {
											fields: [
												"label",
												"url",
												"variant",
												"is_external",
												"icon",
												"size",
												"reversed",
											],
										},
									},
								},
								services: {
									fields: ["title", "slug", "description"],
									populate: {
										icon: {
											fields: ["icon_name", "is_image"],
											populate: {
												image: {
													fields: [
														"formats",
														"name",
														"width",
														"height",
														"url",
														"provider",
														"mime",
													],
												},
											},
										},
									},
								},
								projects: {
									fields: ["title", "slug"],
									populate: {
										cover: {
											fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
										},
									},
								},
								articles: {
									fields: ["title", "slug", "published_date", "description"],
									populate: {
										cover: {
											fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
										},
									},
								},
							},
						},
						"block.list": {
							populate: {
								fields: ["id", "show_numbers", "layout"],
								heading: {
									fields: ["title", "align_content", "has_link", "description"],
									populate: {
										link: {
											fields: [
												"label",
												"url",
												"variant",
												"is_external",
												"icon",
												"size",
												"reversed",
											],
										},
									},
								},
								background: {
									fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
								},
								color: {
									fields: ["type", "hex", "theme"],
								},
								items: {
									fields: ["title", "content"],
									populate: {
										image: {
											fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
										},
										color: {
											fields: ["type", "hex", "theme"],
										},
									},
								},
							},
						},
						"block.examples-build": {
							populate: {
								fields: ["id"],
								heading: {
									fields: ["title", "align_content", "has_link", "description"],
								},
								button: {
									fields: ["label", "url", "variant", "is_external", "icon", "size", "reversed"],
								},
								items: {
									fields: ["title", "description"],
									populate: {
										icon: {
											fields: ["icon_name", "is_image"],
											populate: {
												image: {
													fields: [
														"formats",
														"name",
														"width",
														"height",
														"url",
														"provider",
														"mime",
													],
												},
											},
										},
										subservices: {
											fields: ["title"],
										},
									},
								},
							},
						},
						"block.full-section": {
							populate: {
								fields: ["id", "title", "content"],
								cover: {
									fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
								},
								link: {
									fields: ["label", "url", "variant", "is_external"],
								},
								color: {
									fields: ["type", "hex", "theme"],
								},
							},
						},
						"block.faq": {
							populate: {
								fields: ["id"],
								heading: {
									fields: ["title", "align_content", "has_link", "description"],
								},
								items: {
									fields: ["question", "answer"],
								},
								image: {
									fields: ["formats", "name", "width", "height", "url", "provider", "mime"],
								},
							},
						},
					},
				},
			},
		});

		if (!entity) {
			return ctx.notFound("Home Page not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

		return this.transformResponse(sanitizedEntity);
	},
}));

