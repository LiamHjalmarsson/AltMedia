import type { Icon, Image, ImageFormat, Introduction, Seo } from "../shared";
import type { BlockNode } from "#strapi-blocks-renderer/types";
import type { Blocks, CollectionBlocks, Hero } from "./blocks";
import type { SocialMedia } from "./singles";
import type { AlignContent } from "../enums";

export interface Article {
	id: number;
	title: string;
	slug: string;
	description?: string;
	published_date: Date;
	reading_time_min?: number | null;
	cover: Image;
	services?: RelatedService[];
	hero?: Hero;
	introduction?: Introduction;
	blocks?: CollectionBlocks[];
}

export type RelatedService = Pick<Service, "id" | "title" | "slug">;

export interface Project {
	id: string;
	title: string;
	slug: string;
	client?: string;
	date?: Date;
	cover: Image;
	services: RelatedService[];
	hero?: Hero;
	introduction?: Introduction;
	blocks?: CollectionBlocks[];
}

export interface Service {
	id: number;
	title: string;
	slug: string;
	description: string;
	icon: Icon;
	image: Image;
	subservices: Subservice[];
	// articles?: Article[];
}

export interface Subservice {
	id: string;
	title: string;
	slug: string;
	price_once?: number | null;
	price_month?: number | null;
	content: BlockNode[];
	service?: Service;
	tags?: Tag[];
	hero?: Hero;
	introduction?: Introduction;
	blocks?: CollectionBlocks[];
}

export interface Tag {
	id: number;
	title: string;
}

export interface Page {
	id: number;
	title: string;
	slug: string;
	blocks?: Blocks[];
	seo?: Seo | null;
}

export interface TeamMember {
	id: number;
	firstname: string;
	lastname: string;
	roles: string[];
	bio?: string;
	photo?: ImageFormat;
	email?: string;
	phone?: string;
	social_medias?: SocialMedia[];
}
