/**
 * home-page service
 */

import { factories } from "@strapi/strapi";
import {
	featuredArticlesBlockPopulate,
	fullSectionPopulateBlock,
	heroPopulate,
	listPopulateBlock,
	faqBlockPopulate,
	featuredServicesBlockPopulate,
	featuredOffersBlockPopulate,
	featuredProjectsBlockPopulate,
} from "../../../utils/populate";

export default factories.createCoreService("api::home-page.home-page", ({ strapi }) => ({
	async getHomePage() {
		return strapi.service("api::home-page.home-page").find({
			fields: ["id", "documentId"],
			populate: {
				hero: heroPopulate,
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

