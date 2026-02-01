import type { AlignContent, Htag } from "~/types/enums";
import type { UiLinkComponent } from "./link";

export interface UiHeadingComponent {
	id?: number;
	title: string;
	description?: string;
	align_content: AlignContent;
	has_link?: boolean;
	link?: UiLinkComponent;
	tag?: Htag;
}
