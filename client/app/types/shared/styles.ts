import type { Theme, Variant } from "../enums";

export interface Color {
	type: Variant;
	hex?: string;
	theme: Theme;
}
