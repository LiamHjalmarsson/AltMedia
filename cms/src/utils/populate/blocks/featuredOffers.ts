import { offerPopulate } from "../contentTypes/offer";
import { headingPopulate } from "../ui/heading";

export const featuredOffersBlockPopulate = {
	populate: {
		fields: ["id"],
		heading: headingPopulate,
		offers: offerPopulate,
	},
};
