import type { Media } from "~/types/media";
import type { StylesColorComponent } from "../styles/color";
import type { UiLinkComponent } from "../ui/link";
import type { AlignContent } from "~/types/enums";

export interface HeroComponent {
	id: number;
	title: string;
	description: string | null;
	colored_words?: Record<string, string>;
	align_content: AlignContent;
	background: Media | null;
	links: UiLinkComponent[];
	color: StylesColorComponent;
}

export interface BlockHeroComponent extends HeroComponent {
	__component: "block.hero";
}
