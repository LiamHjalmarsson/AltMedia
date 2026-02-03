import type { ButtonType, Size, Variant } from "~/types/enums";

export interface UiButtonComponent {
	id?: number;
	label: string;
	variant: Variant;
	type: ButtonType;
	size: Size;
	icon?: string | null;
	reversed?: boolean;
}
