import type { Button, Heading, Icon } from "../shared";
import type { BlockNode } from "#strapi-blocks-renderer/types";
import type { Color, Image, Link } from "../shared";
import type { AlignContent } from "../enums";
import type { Article, Offer, Project, Service } from "./collections";

export interface ListItem {
	id: number;
	title: string;
	content: BlockNode[];
	icon?: Icon;
}

export interface ListBlock {
	__component: "block.list";
	id: number;
	heading: Heading;
	items: ListItem[];
}

export interface InfoBlock {
	__component: "block.info";
	id: number;
	image: Image;
	align_content: AlignContent;
	button: Button;
	content: BlockNode[];
	reverse: boolean;
}

export interface Hero {
	id: number;
	title: string;
	description?: string;
	colored_words?: Record<string, string>;
	align_content: AlignContent;
	cover: Image[];
	has_form: boolean;
	links?: Link[];
}

export interface HeroBlock extends Hero {
	__component: "block.hero";
}

export interface FullSectionBlock {
	__component: "block.full-section";
	id: number;
	title: string;
	content: BlockNode[];
	cover?: Image | null;
	link?: Link | null;
	color?: Color | null;
}

export type FeaturedService = Pick<Service, "id" | "documentId" | "title" | "slug" | "description" | "icon">;

export interface FeaturedServicesBlock {
	__component: "block.featured-services";
	id: number;
	heading: Heading;
	services: FeaturedService[];
}

export type FeaturedProject = Pick<Project, "id" | "documentId" | "title" | "slug" | "cover">;

export interface FeaturedProjectsBlock {
	__component: "block.featured-projects";
	id: number;
	heading: Heading;
	projects: FeaturedProject[];
}

export interface FeaturedOffersBlock {
	__component: "block.featured-offers";
	id: number;
	heading: Heading;
	offers: Offer[];
}

export type FeaturedArticle = Pick<
	Article,
	"id" | "documentId" | "title" | "slug" | "published_date" | "reading_time_min" | "description" | "cover"
>;

export interface FeaturedArticlesBlock {
	__component: "block.featured-articles";
	id: number;
	heading: Heading;
	articles: FeaturedArticle[];
}

export interface FaqItem {
	id: number;
	question: string;
	answer: BlockNode[];
}

export interface FaqBlock {
	__component: "block.faq";
	id: number;
	heading: Heading;
	items: FaqItem[];
	icon: Icon;
}

export interface Cta {
	id: number;
	title: string;
	description?: string;
	buttons?: Button[];
	links?: Link[];
}

export interface CtaBlock extends Cta {
	__component: "block.cta";
}

export type MarketingBlocks = HeroBlock | CtaBlock | FullSectionBlock;

export type CollectionBlocks = InfoBlock | ListBlock | FaqBlock;

export type Blocks =
	| MarketingBlocks
	| CollectionBlocks
	| FeaturedServicesBlock
	| FeaturedProjectsBlock
	| FeaturedArticlesBlock
	| FeaturedOffersBlock;
