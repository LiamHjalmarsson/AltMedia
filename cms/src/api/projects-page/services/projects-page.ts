/**
 * projects-page service
 */

import { factories } from "@strapi/strapi";
import { seoPopulate } from "../../../utils/populate";

export default factories.createCoreService("api::projects-page.projects-page");

