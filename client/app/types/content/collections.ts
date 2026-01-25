import type { BlockNode } from "#strapi-blocks-renderer/types";
import type { Image, ImageFormat } from "../shared/media";
import type { Introduction } from "../shared/sections";
import type { Seo } from "../shared/seo";
import type { Icon } from "../shared/ui";
import type { Blocks, Hero } from "./blocks";
import type { SocialMedia } from "./singles";

export type RelatedService = Pick<Service, "id" | "title" | "slug">;

export interface Article {
	id: number;
	title: string;
	slug: string;
	description?: string;
	published_date: Date;
	reading_time_min?: number | null;
	cover: Image;
	services?: RelatedService[];
	blocks?: Blocks[];
	seo: Seo | null;
}

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
	blocks?: Blocks[];
	seo: Seo | null;
}

export interface Service {
	id: number;
	title: string;
	slug: string;
	description: string;
	content: BlockNode[];
	icon: Icon;
	image: Image;
	subservices: Pick<Subservice, "id" | "title" | "slug" | "content" | "image" | "has_page">[];
	articles?: Pick<Article, "id" | "title" | "slug">[];
	order?: number;
	seo?: Seo | null;
}

export interface Subservice {
	id: string;
	title: string;
	slug: string;
	price_once?: number | null;
	has_page: boolean;
	content: BlockNode[];
	service?: Service;
	image: Image;
	tags?: Tag[];
	hero?: Hero;
	introduction?: Introduction;
	blocks?: Blocks[];
	seo?: Seo | null;
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
