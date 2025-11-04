/**
 * home-page service
 */

import { factories } from "@strapi/strapi";
import {
	fullSectionPopulateBlock,
	formPopulate,
	listPopulateBlock,
	heroPopulate,
	featuredBlockPopulate,
	examplesBuildBlockPopulate,
	faqBlockPopulate,
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

