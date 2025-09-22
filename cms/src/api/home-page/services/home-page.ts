/**
 * home-page service
 */

import { factories } from "@strapi/strapi";
import { headingPopulate, heroPopulate, iconPopulate } from "../../../utils/populate";

export default factories.createCoreService("api::home-page.home-page", ({ strapi }) => ({
	async getHomePage() {
		return strapi.service("api::home-page.home-page").find({
			fields: ["id", "documentId"],
			populate: {
				hero: heroPopulate,
				blocks: {
					on: {
						"block.featured-services": {
							populate: {
								fields: ["id"],
								heading: headingPopulate,
								services: {
									fields: ["title", "slug", "description"],
									populate: {
										icon: iconPopulate,
									},
								},
							},
						},
						"block.list": {
							populate: {
								fields: ["id"],
								heading: headingPopulate,
								items: {
									fields: ["title", "content"],
									populate: {
										icon: iconPopulate,
									},
								},
							},
						},
						"block.featured-offers": {
							populate: {
								fields: ["id"],
								heading: headingPopulate,
								offers: {
									fields: [
										"title",
										"description",
										"features",
										"is_popular",
										"start_price",
										"month_price",
									],
									populate: {
										icon: iconPopulate,
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
								heading: headingPopulate,
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
								heading: headingPopulate,
								items: {
									fields: ["question", "answer"],
								},
								icon: iconPopulate,
							},
						},
						"block.featured-articles": {
							populate: {
								fields: ["id"],
								heading: headingPopulate,
								articles: {
									fields: ["title", "slug", "published_date", "description", "reading_time_min"],
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

