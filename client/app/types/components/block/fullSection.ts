import type { StrapiBlocksContent } from "~/types/blocks";
import type { UiLinkComponent } from "../ui/link";
import type { StylesColorComponent } from "../styles/color";
import type { Media } from "~/types/media";

export interface BlockFullSectionComponent {
	__component: "block.full-section";
	id: number;
	title: string;
	content: StrapiBlocksContent;
	cover?: Media | null;
	link?: UiLinkComponent | null;
	color?: StylesColorComponent | null;
}
