import { formInputPopulate } from "./input";

export const formPopulate = {
	fields: ["title", "description", "columns"],
	populate: {
		inputs: formInputPopulate,
		button: {
			fields: ["label", "variant", "type", "icon"],
		},
	},
};
