/**
 * service service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::service.service", ({ strapi }) => ({
	async getAllServices(sanitizedQuery) {
		return strapi.service("api::service.service").find({
			...sanitizedQuery,
			fields: ["id", "title", "slug", "description"],
			populate: {
				icon: {
					fields: ["icon_name", "is_image"],
					populate: {
						image: {
							fields: ["formats", "name", "width", "height", "url", "provider"],
						},
					},
				},
				subservices: {
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
}));

