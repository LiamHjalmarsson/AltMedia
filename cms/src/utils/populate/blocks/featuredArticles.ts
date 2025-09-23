import { articlePopulate } from "../contentTypes/article";
import { headingPopulate } from "../ui/heading";

export const featuredArticlesBlockPopulate = {
	populate: {
		fields: ["id"],
		heading: headingPopulate,
		articles: articlePopulate,
	},
};
