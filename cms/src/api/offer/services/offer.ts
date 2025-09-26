/**
 * offer service
 */

import { factories } from "@strapi/strapi";
import { iconPopulate } from "../../../utils/populate";

export default factories.createCoreService("api::offer.offer", ({ strapi }) => ({
	async getAllOffers(sanitizedQuery) {
		return strapi.service("api::offer.offer").find({
			...sanitizedQuery,
			fields: ["id", "title", "slug", "description", "is_popular", "features", "start_price", "month_price"],
			populate: {
				icon: iconPopulate,
				subservices: subservicePopulate,
			},
		});
	},

	async getOfferBySlug(sanitizedQuery, slug: string) {
		const { results } = await strapi.service("api::offer.offer").find({
			...sanitizedQuery,
			filters: { slug },
			fields: ["id", "title", "slug", "description", "is_popular", "features", "start_price", "month_price"],
			populate: {
				icon: iconPopulate,
				subservices: subservicePopulate,
			},
		});

		return results?.[0] ?? null;
	},
}));

export const subservicePopulate = {
	fields: ["title", "price_once", "price_month"],
};

