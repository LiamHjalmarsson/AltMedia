import type { Icon, Image, Introduction } from "../shared";
import type { BlockNode } from "#strapi-blocks-renderer/types";
import type { Blocks, FullSectionBlock, Hero, InfoBlock, ListBlock } from "./blocks";

export interface Article {
	id: number;
	title: string;
	slug: string;
	cover: Image;
	description?: string;
	published_date: Date;
	reading_time_minutes: number;
	services: Service[];
	hero?: Hero;
	introduction?: Introduction;
	blocks?: collectionBlocks[];
}

export interface Offer {
	id: number;
	title: string;
	description?: string;
	icon?: Icon;
	features?: string[];
	is_popular: boolean;
	start_price: number;
	month_price: number;
}

export interface Project {
	id: number;
	title: string;
	slug: string;
	cover: Image;
	services: Service[];
	client?: string;
	date?: Date;
	hero?: Hero;
	introduction?: Introduction;
	blocks?: collectionBlocks[];
}

export interface Service {
	id: number;
	title: string;
	slug: string;
	subservices: Subservice[];
	description: string;
	icon: Icon;
}

export interface Subservice {
	id: number;
	title: string;
	slug: string;
	service?: Service;
	tags?: Tag[];
	content: BlockNode[];
	hero?: Hero;
	introduction?: Introduction;
	blocks?: collectionBlocks[];
}

export interface Tag {
	id: number;
	title: string;
}

export type collectionBlocks = FullSectionBlock | InfoBlock | ListBlock;
