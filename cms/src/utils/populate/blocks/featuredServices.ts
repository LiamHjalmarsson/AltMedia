import { servicePopulate } from "../contentTypes/service";
import { headingPopulate } from "../ui/heading";

export const featuredServicesBlockPopulate = {
	populate: {
		fields: ["id"],
		heading: headingPopulate,
		services: servicePopulate,
	},
};
