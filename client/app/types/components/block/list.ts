import type { StrapiBlocksContent } from "~/types/blocks";
import type { Media } from "~/types/media";
import type { UiHeadingComponent } from "../ui/heading";
import type { Layout } from "~/types/enums";
import type { StylesColorComponent } from "../styles/color";

export interface ListItem {
	id: number;
	title: string;
	content: StrapiBlocksContent;
	image: Media | null;
}

export interface BlockListComponent {
	__component: "block.list";
	id: number;
	heading: UiHeadingComponent;
	show_numbers: boolean;
	layout: Layout;
	background?: Media;
	color?: StylesColorComponent;
	items: ListItem[];
}
