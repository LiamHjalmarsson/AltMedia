/**
 * subservice service
 */

import { factories } from "@strapi/strapi";
import {
	fullSectionPopulateBlock,
	imagePopulate,
	infoBlockPopulate,
	introductionBlockPopulate,
	listPopulateBlock,
} from "../../../utils/populate";

export default factories.createCoreService("api::subservice.subservice", ({ strapi }) => ({
	async getAllSubservices(sanitizedQuery) {
		return strapi.service("api::subservice.subservice").find({
			...sanitizedQuery,
			fields: ["id", "title", "slug", "content"],
			populate: {
				tags: {
					fields: ["title"],
				},
				service: {
					fields: ["title", "slug"],
				},
			},
		});
	},

	async getSubserviceBySlug(sanitizedQuery, slug: string) {
		const { results } = await strapi.service("api::subservice.subservice").find({
			...sanitizedQuery,
			filters: { slug },
			fields: ["id", "title", "slug", "content"],
			populate: {
				tags: {
					fields: ["title"],
				},
				service: {
					fields: ["title", "slug"],
				},
				hero: heroPopulate,
				introduction: introductionBlockPopulate,
				blocks: {
					on: {
						"block.list": listPopulateBlock,
						"block.info": infoBlockPopulate,
						"block.full-section": fullSectionPopulateBlock,
					},
				},
			},
		});

		return results?.[0] ?? null;
	},
}));

const heroPopulate = {
	fields: ["title", "description", "colored_words", "align_content"],
	populate: {
		cover: imagePopulate,
	},
};

