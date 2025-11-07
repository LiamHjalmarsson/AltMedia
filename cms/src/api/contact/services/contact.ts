/**
 * contact service
 */

import { factories } from "@strapi/strapi";
import { formPopulate, seoPopulate } from "../../../utils/populate";

export default factories.createCoreService("api::contact.contact");

