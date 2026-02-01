import type { Size, Variant } from "~/types/enums";

export interface UiLinkComponent {
	id?: number;
	label: string;
	url: string;
	variant: Variant;
	size: Size;
	is_external?: boolean;
	icon?: string;
	reversed?: boolean;
}
