/**
 * project service
 */

import { factories } from "@strapi/strapi";
import {
	fullSectionPopulateBlock,
	imagePopulate,
	infoBlockPopulate,
	introductionBlockPopulate,
} from "../../../utils/populate";

export default factories.createCoreService("api::project.project", ({ strapi }) => ({
	async getAllProjects(sanitizedQuery) {
		return strapi.service("api::project.project").find({
			...sanitizedQuery,
			fields: ["id", "title", "slug"],
			populate: {
				cover: {
					fields: ["formats", "name", "width", "height", "url", "provider"],
				},
				services: {
					fields: ["title", "slug"],
				},
			},
		});
	},

	async getProjectBySlug(sanitizedQuery, slug: string) {
		const { results } = await strapi.service("api::project.project").find({
			...sanitizedQuery,
			filters: { slug },
			fields: ["id", "title", "slug", "client", "date"],
			populate: {
				cover: imagePopulate,
				services: servicePopulate,
				hero: heroPopulate,
				introduction: introductionBlockPopulate,
				blocks: {
					on: {
						"block.info": infoBlockPopulate,
						"block.full-section": fullSectionPopulateBlock,
					},
				},
			},
		});

		return results?.[0] ?? null;
	},
}));

const servicePopulate = {
	fields: ["title", "slug"],
};

const heroPopulate = {
	fields: ["title", "description", "colored_words", "align_content"],
	populate: {
		cover: imagePopulate,
	},
};

