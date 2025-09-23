import { iconPopulate } from "../ui/icon";

export const offerPopulate = {
	fields: ["title", "description", "features", "is_popular", "start_price", "month_price"],
	populate: { icon: iconPopulate },
};
