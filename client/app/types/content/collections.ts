import type { BaseEntity, Icon, Image, ImageFormat, Introduction, Seo } from "../shared";
import type { BlockNode } from "#strapi-blocks-renderer/types";
import type { Blocks, CollectionBlocks, Hero } from "./blocks";
import type { SocialMedia } from "./singles";

export interface ContentItem extends BaseEntity {
	title: string;
	slug: string;
	hero?: Hero;
	introduction?: Introduction;
	blocks?: CollectionBlocks[];
}

export interface Article extends ContentItem {
	published_date: Date;
	reading_time_min?: number | null;
	description?: string;
	cover: Image;
	services?: RelatedService[];
}

export interface Offer extends BaseEntity {
	title: string;
	description?: string;
	features?: string[];
	is_popular: boolean;
	start_price: number;
	month_price: number;
	slug?: string;
	icon?: Icon;
	subservices: Subservice[];
}

export type RelatedService = Pick<Service, "id" | "documentId" | "title" | "slug">;

export interface Project extends ContentItem {
	cover: Image;
	services: RelatedService[];
	description: string;
	client?: string;
	date?: Date;
}

export interface Service extends BaseEntity {
	title: string;
	slug: string;
	description: string;
	icon: Icon;
	image: Image;
	subservices: Subservice[];
}

export interface Subservice extends ContentItem {
	content: BlockNode[];
	tags?: Tag[];
	service?: Service;
	price_once?: number | null;
	price_month?: number | null;
}

export interface Tag extends BaseEntity {
	title: string;
}

export interface Page extends BaseEntity {
	title: string;
	slug: string;
	blocks: Blocks[];
	seo?: Seo | null;
}

export interface TeamMember extends BaseEntity {
	firstname: string;
	lastname: string;
	roles: string[];
	bio?: string;
	photo?: ImageFormat;
	email?: string;
	phone?: string;
	social_medias?: SocialMedia[];
}

export interface BuildProject extends BaseEntity {
	title: string;
	description: string;
	steps: Step[];
	offers: Offer[];
	subservices: Subservice[];
}

export interface Step {
	id: number;
	title: string;
	description?: string | null;
}
