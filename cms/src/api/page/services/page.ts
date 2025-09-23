/**
 * page service
 */
import { factories } from "@strapi/strapi";
import {
	fullSectionPopulateBlock,
	imagePopulate,
	infoBlockPopulate,
	introductionBlockPopulate,
	listPopulateBlock,
	seoPopulate,
} from "../../../utils/populate";

const heroPopulate = {
	fields: ["title", "description", "colored_words", "align_content"],
	populate: {
		cover: imagePopulate,
	},
};

const ctaBlockPopulate = {
	populate: {
		fields: ["id", "title", "description"],
		buttons: { fields: ["label", "variant", "type"] },
		links: { fields: ["label", "url", "variant", "is_external"] },
	},
};

export default factories.createCoreService("api::page.page", ({ strapi }) => ({
	async getAllPages(sanitizedQuery) {
		return strapi.service("api::page.page").find({
			...sanitizedQuery,
			fields: ["id", "title", "slug"],
		});
	},

	async getPageBySlug(sanitizedQuery, slug: string) {
		const { results } = await strapi.service("api::page.page").find({
			...sanitizedQuery,
			filters: { slug },
			fields: ["id", "title", "slug"],
			populate: {
				seo: seoPopulate,
				blocks: {
					on: {
						"block.cta": ctaBlockPopulate,
						"block.full-section": fullSectionPopulateBlock,
						"block.hero": heroPopulate,
						"block.info": infoBlockPopulate,
						"block.list": listPopulateBlock,
						"sections.introduction": introductionBlockPopulate,
					},
				},
			},
		});

		return results?.[0] ?? null;
	},
}));

