import type { BlockNode } from "#strapi-blocks-renderer/types";
import type { Color, Image, Link } from "../shared";

export interface FullSectionBlock {
	__component: "block.featured-services";
	id: number;
	title: string;
	content: BlockNode[];
	cover: Image;
	link: Link;
	color: Color;
}
