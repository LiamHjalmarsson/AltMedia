import type { BlockNode } from "#strapi-blocks-renderer/types";
import type { Subservice } from "../content/collections";

export interface Introduction {
	id: number;
	title: string;
	subtitle: string;
	description: BlockNode[];
	subservices: Subservice[];
}
