import type { Icon } from "../shared";
import type { BlockNode } from "#strapi-blocks-renderer/types";

export interface Subservice {
	id: number;
	title: string;
	slug: string;
	content: BlockNode[];
	service: Service;
	tags: string[];
}

export interface Service {
	id: number;
	title: string;
	slug: string;
	description: string;
	icon: Icon;
	subservices: Subservice[];
}

export interface Offer {
	id: number;
	title: string;
	description?: string;
	icon?: Icon;
	features?: string[];
	is_populare: boolean;
	start_price: number;
	month_price: number;
}
