/**
 * article service
 */

import { factories } from "@strapi/strapi";
import {
	fullSectionPopulateBlock,
	imagePopulate,
	infoBlockPopulate,
	introductionBlockPopulate,
	listPopulateBlock,
} from "../../../utils/populate";

export default factories.createCoreService("api::article.article", ({ strapi }) => ({
	async getAllArticles(sanitizedQuery) {
		return strapi.service("api::article.article").find({
			...sanitizedQuery,
			fields: ["id", "title", "slug", "description", "published_date", "reading_time_min"],
			populate: {
				cover: imagePopulate,
				services: {
					fields: ["title", "slug"],
				},
			},
		});
	},

	async getArticleBySlug(sanitizedQuery, slug: string) {
		const { results } = await strapi.service("api::article.article").find({
			...sanitizedQuery,
			filters: { slug },
			fields: ["id", "title", "slug", "description", "published_date", "reading_time_min"],
			populate: {
				cover: imagePopulate,
				services: {
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

