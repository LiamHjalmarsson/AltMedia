import { iconPopulate } from "./icon";

export const linkPopulate = {
	fields: ["label", "url", "variant", "is_external"],
};

export const linkWithIconPopulate = {
	...linkPopulate,
	populate: {
		icon: iconPopulate,
	},
};
