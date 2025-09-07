/**
 * project service
 */

import { factories } from "@strapi/strapi";

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
					fields: ["title", "slug"],
				},
			},
		});
	},
}));

