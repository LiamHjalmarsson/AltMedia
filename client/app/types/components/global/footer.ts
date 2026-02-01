import type { Media } from "~/types/media";
import type { BlockCtaComponent } from "../block/cta";
import type { UiMenuLinkComponent } from "./menuLink";

export interface UiFooterComponent {
	id: number;
	logo: Media;
	title: string;
	description: string;
	has_cta: boolean;
	cta?: BlockCtaComponent;
	footer_columns?: UiFooterColumnComponent[];
}

export interface UiFooterColumnComponent {
	id: number;
	title: string;
	url?: string;
	links: UiMenuLinkComponent[];
}
