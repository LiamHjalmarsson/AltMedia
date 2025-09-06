import type { Heading, Icon } from "../shared";
import type { BlockNode } from "#strapi-blocks-renderer/types";

export interface ListItem {
	id: number;
	title: string;
	content: BlockNode[];
	icon?: Icon;
}

export interface List {
	id: number;
	heading: Heading;
	items: ListItem[];
}

export interface ListBlock extends List {
	__component: "block.list";
}
