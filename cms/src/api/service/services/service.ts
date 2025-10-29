/**
 * service service
 */

import { factories } from "@strapi/strapi";
import { iconPopulate, imagePopulate } from "../../../utils/populate";

export default factories.createCoreService("api::service.service", ({ strapi }) => ({
	async getAllServices(sanitizedQuery) {
		return strapi.service("api::service.service").find({
			...sanitizedQuery,
			fields: ["id", "title", "slug", "description"],
			populate: {
				icon: iconPopulate,
				image: imagePopulate,
				subservices: subservicePopulate,
			},
		});
	},

	async getServiceBySlug(sanitizedQuery, slug: string) {
		const { results } = await strapi.service("api::service.service").find({
			...sanitizedQuery,
			filters: { slug },
			fields: ["id", "title", "slug", "description"],
			populate: {
				subservices: subservicePopulate,
				image: imagePopulate,
				icon: iconPopulate,
			},
		});

		return results?.[0] ?? null;
	},
}));

export const subservicePopulate = {
	fields: ["title", "slug", "content"],
	populate: {
		tags: {
			fields: ["title"],
		},
	},
};

