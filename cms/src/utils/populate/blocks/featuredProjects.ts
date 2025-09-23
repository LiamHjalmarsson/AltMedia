import { projectPopulate } from "../contentTypes/project";
import { headingPopulate } from "../ui/heading";

export const featuredProjectsBlockPopulate = {
	populate: {
		fields: ["id"],
		heading: headingPopulate,
		projects: projectPopulate,
	},
};
