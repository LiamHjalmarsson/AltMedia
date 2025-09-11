/**
 * home-page service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::home-page.home-page", ({ strapi }) => ({
	async getHomePage() {
		return strapi.service("api::home-page.home-page").find({
			fields: ["id", "documentId"],
			populate: {
				hero: {
					fields: ["title", "description", "colored_words", "align_content", "has_form"],
					populate: {
						cover: {
							fields: ["alternativeText", "caption", "width", "height", "url", "provider"],
						},
						links: {
							fields: ["label", "url", "variant", "is_external"],
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
									fields: ["label", "variant", "type"],
								},
							},
						},
					},
				},
				blocks: {
					on: {
						"block.featured-services": {
							populate: {
								fields: ["id"],
								heading: {
									fields: ["title", "align_content", "has_link"],
									populate: {
										link: {
											fields: ["label", "url", "variant", "is_external"],
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
													fields: ["formats", "name", "width", "height", "url", "provider"],
												},
											},
										},
									},
								},
							},
						},
						"block.list": {
							populate: {
								fields: ["id"],
								heading: {
									fields: ["title", "align_content", "has_link"],
									populate: {
										link: {
											fields: ["label", "url", "variant", "is_external"],
										},
									},
								},
								items: {
									fields: ["title", "content"],
									populate: {
										icon: {
											fields: ["icon_name", "is_image"],
											populate: {
												image: {
													fields: ["formats", "name", "width", "height", "url", "provider"],
												},
											},
										},
									},
								},
							},
						},
						"block.featured-offers": {
							populate: {
								fields: ["id"],
								heading: {
									fields: ["title", "align_content", "has_link"],
									populate: {
										link: {
											fields: ["label", "url", "variant", "is_external"],
										},
									},
								},
								offers: {
									fields: [
										"title",
										"description",
										"features",
										"is_populare",
										"start_price",
										"month_price",
									],
									populate: {
										icon: {
											fields: ["icon_name", "is_image"],
											populate: {
												image: {
													fields: ["formats", "name", "width", "height", "url", "provider"],
												},
											},
										},
									},
								},
							},
						},
						"block.full-section": {
							populate: {
								fields: ["id", "title", "content"],
								cover: {
									fields: ["formats", "name", "width", "height", "url", "provider"],
								},
								link: {
									fields: ["label", "url", "variant", "is_external"],
								},
								color: {
									fields: ["is_hex", "type", "is_dark_text", "hex"],
								},
							},
						},
						"block.featured-projects": {
							populate: {
								fields: ["id"],
								heading: {
									fields: ["title", "align_content", "has_link"],
									populate: {
										link: {
											fields: ["label", "url", "variant", "is_external"],
										},
									},
								},
								projects: {
									fields: ["title", "slug"],
									populate: {
										cover: {
											fields: ["formats", "name", "width", "height", "url", "provider"],
										},
									},
								},
							},
						},
						"block.faq": {
							populate: {
								fields: ["id"],
								heading: {
									fields: ["title", "align_content", "has_link"],
									populate: {
										link: {
											fields: ["label", "url", "variant", "is_external"],
										},
									},
								},
								items: {
									fields: ["question", "answer"],
								},
								icon: {
									fields: ["icon_name", "is_image"],
									populate: {
										image: {
											fields: ["formats", "name", "width", "height", "url", "provider"],
										},
									},
								},
							},
						},
						"block.featured-articles": {
							populate: {
								fields: ["id"],
								heading: {
									fields: ["title", "align_content", "has_link"],
									populate: {
										link: {
											fields: ["label", "url", "variant", "is_external"],
										},
									},
								},
								articles: {
									fields: ["title", "slug", "published_date", "description"],
									populate: {
										cover: {
											fields: ["formats", "name", "width", "height", "url", "provider"],
										},
									},
								},
							},
						},
					},
				},
			},
		});
	},
}));

