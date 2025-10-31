/**
 * start-a-project service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::start-a-project.start-a-project", ({ strapi }) => ({
	async getStartAProject() {
		return strapi.service("api::start-a-project.start-a-project").find({
			fields: ["id", "documentId", "title", "description"],
			populate: {
				steps: stepsPopulate,
				subservices: subservicePopulate,
			},
		});
	},
}));

const stepsPopulate = {
	fields: ["title", "description"],
};

const subservicePopulate = {
	fields: ["title", "content"],
};

