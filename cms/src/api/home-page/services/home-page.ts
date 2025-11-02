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
			fields: ["id", "documentId", "has_form"],
			populate: {
				hero: heroPopulate,
				form: formPopulate,
				blocks: {
					on: {
						"block.featured": featuredBlockPopulate,
						"block.list": listPopulateBlock,
						"block.examples-build": examplesBuildBlockPopulate,
						"block.full-section": fullSectionPopulateBlock,
						"block.faq": faqBlockPopulate,
					},
				},
			},
		});
	},
}));

export const heroPopulate = {
	fields: ["title", "description", "colored_words", "align_content", "badge"],
	populate: {
		background: imagePopulate,
		links: linkPopulate,
	},
};

export const featuredBlockPopulate = {
	populate: {
		fields: ["id", "features"],
		heading: headingPopulate,
		services: {
			fields: ["title", "slug", "description"],
			populate: {
				icon: iconPopulate,
			},
		},
		projects: {
			fields: ["title", "slug"],
			populate: {
				cover: imagePopulate,
			},
		},
		articles: {
			fields: ["title", "slug", "published_date", "description"],
			populate: {
				cover: imagePopulate,
			},
		},
	},
};

export const listPopulateBlock = {
	populate: {
		fields: ["id", "show_numbers", "layout"],
		heading: headingPopulate,
		background: imagePopulate,
		items: {
			fields: ["title", "content"],
			populate: {
				image: imagePopulate,
			},
		},
	},
};

export const examplesBuildBlockPopulate = {
	populate: {
		fields: ["id"],
		heading: headingPopulate,
		button: linkPopulate,
		items: {
			fields: ["title", "description"],
			populate: {
				icon: iconPopulate,
				subservices: {
					populate: {
						fields: ["title"],
					},
				},
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

