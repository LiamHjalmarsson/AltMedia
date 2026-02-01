import type { Size, Variant } from "~/types/enums";
import type { UiMenuLinkComponent } from "./menuLink";
import type { Media } from "~/types/media";

export interface UiNavigationComponent {
	id: number;
	aria_label?: string;
	logo?: Media;
	links: UiMenuLinkComponent[];
	cta: {
		label: string;
		url: string;
		variant: Variant;
		size: Size;
	};
}
