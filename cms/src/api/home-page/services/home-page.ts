/**
 * home-page service
 */

import { factories } from "@strapi/strapi";
import {
	fullSectionPopulateBlock,
	imagePopulate,
	linkPopulate,
	formPopulate,
	headingPopulate,
	iconPopulate,
} from "../../../utils/populate";

export default factories.createCoreService("api::home-page.home-page", ({ strapi }) => ({
	async getHomePage() {
		return strapi.service("api::home-page.home-page").find({
			fields: ["id", "documentId"],
			populate: {
				hero: heroPopulate,
				hero_form: formPopulate,
				blocks: {
					on: {
						"block.featured-services": featuredServicesBlockPopulate,
						"block.list": listPopulateBlock,
						"block.featured-offers": featuredOffersBlockPopulate,
						"block.full-section": fullSectionPopulateBlock,
						"block.featured-projects": featuredProjectsBlockPopulate,
						"block.faq": faqBlockPopulate,
						"block.featured-articles": featuredArticlesBlockPopulate,
					},
				},
			},
		});
	},
}));

export const heroPopulate = {
	fields: ["title", "description", "colored_words", "align_content", "has_form"],
	populate: {
		cover: imagePopulate,
		links: linkPopulate,
	},
};

export const featuredServicesBlockPopulate = {
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
};

export const listPopulateBlock = {
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
};

export const featuredOffersBlockPopulate = {
	populate: {
		fields: ["id"],
		heading: headingPopulate,
		offers: {
			fields: ["title", "description", "features", "is_popular", "start_price", "month_price"],
			populate: { icon: iconPopulate },
		},
	},
};

export const featuredProjectsBlockPopulate = {
	populate: {
		fields: ["id"],
		heading: headingPopulate,
		projects: {
			fields: ["title", "slug"],
			populate: {
				cover: imagePopulate,
			},
		},
	},
};

export const faqBlockPopulate = {
	populate: {
		fields: ["id"],
		heading: headingPopulate,
		items: {
			fields: ["question", "answer"],
		},
		icon: iconPopulate,
	},
};

export const featuredArticlesBlockPopulate = {
	populate: {
		fields: ["id"],
		heading: headingPopulate,
		articles: {
			fields: ["title", "slug", "published_date", "description"],
			populate: {
				cover: imagePopulate,
			},
		},
	},
};

