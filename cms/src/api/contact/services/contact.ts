/**
 * contact service
 */

import { factories } from "@strapi/strapi";
import { formPopulate } from "../../../utils/populate";

export default factories.createCoreService("api::contact.contact", ({ strapi }) => ({
	async getContactPage() {
		return strapi.service("api::contact.contact").find({
			fields: ["id", "documentId"],
			populate: {
				form: formPopulate,
			},
		});
	},
}));

