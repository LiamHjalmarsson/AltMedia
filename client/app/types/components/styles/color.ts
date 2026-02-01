import type { ColorType, Theme } from "~/types/enums";

export interface StylesColorComponent {
	type: ColorType;
	theme: Theme;
	hex: string | null;
}
