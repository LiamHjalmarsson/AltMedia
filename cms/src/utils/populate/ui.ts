export const imagePopulate = {
	fields: ["formats", "name", "width", "height", "url", "provider"],
};

export const iconPopulate = {
	fields: ["icon_name", "is_image"],
	populate: {
		image: imagePopulate,
	},
};

export const linkPopulate = {
	fields: ["label", "url", "variant", "is_external"],
};

export const linkWithIconPopulate = {
	...linkPopulate,
	populate: {
		icon: iconPopulate,
	},
};

export const headingPopulate = {
	fields: ["title", "align_content", "has_link"],
	populate: {
		link: linkPopulate,
	},
};
