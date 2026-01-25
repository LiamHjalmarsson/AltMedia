import type { Theme, Variant } from "~/types";

type BlockColor =
	| null
	| undefined
	| {
			hex?: string | null;
			type?: Variant;
			theme?: Theme;
	  };

export function themeClasses(color: BlockColor) {
	const defaultBackgroundClassName = "bg-bg-dark";

	const defaultTextClassName = "text-white";

	if (!color) {
		return {
			sectionClassName: `${defaultBackgroundClassName} ${defaultTextClassName}`,
			sectionStyle: undefined,
			contentTextClass: defaultTextClassName,
		};
	}

	if (color.hex) {
		const textClassName = color.theme === "dark" ? "text-white" : "text-black";

		return {
			sectionClassName: textClassName,
			sectionStyle: { backgroundColor: color.hex },
			contentTextClass: textClassName,
		};
	}

	const backgroundClassName =
		color.type === "primary"
			? "bg-primary"
			: color.type === "secondary"
				? "bg-secondary"
				: defaultBackgroundClassName;

	const textClassName = color.theme === "dark" ? "text-white" : "text-black";

	return {
		sectionClassName: `${backgroundClassName} ${textClassName}`,
		sectionStyle: undefined,
		contentTextClass: textClassName,
	};
}
