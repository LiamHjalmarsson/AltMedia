import type { ColorType, Theme } from "~/types";

type BlockColor =
	| null
	| undefined
	| {
			hex?: string | null;
			type?: ColorType;
			theme?: Theme;
	  };

type ThemeClassesResult = {
	sectionClassName: string;
	sectionStyle?: { backgroundColor: string } | undefined;
	contentTextClass: string;
};

export function themeClasses(color: BlockColor): ThemeClassesResult {
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
		const theme: Theme = color.theme ?? "dark";

		const textClassName = theme === "dark" ? "text-white" : "text-black";

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
				: color.type === "white"
					? "bg-white"
					: color.type === "black"
						? "bg-black"
						: defaultBackgroundClassName;

	const theme: Theme = color.theme ?? (color.type === "white" ? "light" : "dark");

	const textClassName = theme === "dark" ? "text-white" : "text-black";

	return {
		sectionClassName: `${backgroundClassName} ${textClassName}`,
		sectionStyle: undefined,
		contentTextClass: textClassName,
	};
}
