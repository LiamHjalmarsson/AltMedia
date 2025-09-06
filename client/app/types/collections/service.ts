import type { Icon, Heading } from "../shared";
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

export interface FeaturedService {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	description: string;
	icon: Icon;
}

export interface FeaturedServices {
	__component: "block.featured-services";
	id: number;
	heading: Heading;
	services: FeaturedService[];
}
