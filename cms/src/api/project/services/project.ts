/**
 * project service
 */

import { factories } from "@strapi/strapi";
import subservice from "../../subservice/controllers/subservice";

export default factories.createCoreService("api::project.project", ({ strapi }) => ({
	async getAllProjects(sanitizedQuery) {
		return strapi.service("api::project.project").find({
			...sanitizedQuery,
			fields: ["id", "title", "slug"],
			populate: {
				cover: {
					fields: ["formats", "name", "width", "height", "url", "provider"],
				},
				services: {
					fields: ["title", "slug", "content"],
					populate: {
						tags: {
							fields: "title",
						},
					},
				},
			},
		});
	},

	async getProjectByTitle(sanitizedQuery) {
		return strapi.service("api::project.project").find({
			...sanitizedQuery,
			fields: ["id", "title", "slug"],
			populate: {
				cover: {
					fields: ["formats", "name", "width", "height", "url", "provider"],
				},
				services: {
					fields: ["title", "slug", "content"],
					populate: {
						tags: {
							fields: "title",
						},
					},
				},
				hero: {
					fields: ["title", "description", "colored_words", "aligh_content"],
					populate: {
						cover: {
							fields: ["formats", "name", "width", "height", "url", "provider"],
						},
						links: {
							fields: ["label", "url", "variant", "is_external"],
						},
					},
				},
				introdunction: {
					fields: ["title", "subtitle", "description"],
					populate: {
						subservices: {
							fields: ["title", "slug"],
						},
					},
				},
			},
		});
	},
}));

