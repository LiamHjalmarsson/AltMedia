import type { Icon, Image, ImageFormat, Introduction, Seo } from "../shared";
import type { BlockNode } from "#strapi-blocks-renderer/types";
import type { Blocks, FullSectionBlock, Hero, InfoBlock, ListBlock } from "./blocks";
import type { SocialMedia } from "./singles";

export interface Article {
	id: number;
	title: string;
	slug: string;
	cover: Image;
	description?: string;
	published_date: Date;
	reading_time_min: number;
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

export interface Page {
	id: number;
	title: string;
	slug: string;
	blocks: Blocks[];
	seo?: Seo;
}

export interface TeamMember {
	firstname: string;
	lastname: string;
	roles: string[];
	bio?: string;
	photo?: ImageFormat;
	email?: string;
	phone?: string;
	social_medias?: SocialMedia[];
}

export type collectionBlocks = FullSectionBlock | InfoBlock | ListBlock;
