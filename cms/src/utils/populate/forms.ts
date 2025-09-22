export const formInputPopulate = {
	fields: ["label", "name", "placeholder", "required", "type", "input_type", "rows", "options", "column_span"],
};

export const formPopulate = {
	fields: ["title", "description", "columns"],
	populate: {
		inputs: formInputPopulate,
		button: {
			fields: ["label", "variant", "type"],
		},
	},
};
