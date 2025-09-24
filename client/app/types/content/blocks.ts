import type { Button, Heading, Icon } from "../shared";
import type { BlockNode } from "#strapi-blocks-renderer/types";
import type { Color, Image, Link } from "../shared";
import type { AlignContent } from "../enums";
import type { Form } from "../shared";
import type { Offer, Service } from "./collections";

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
	cover: Image[];
	align_content: AlignContent;
	links: Link[];
	has_form: boolean;
	form?: Form;
}

export interface HeroBlock extends Hero {
	__component: "block.hero";
}

export interface FullSectionBlock {
	__component: "block.full-section";
	id: number;
	title: string;
	content: BlockNode[];
	cover: Image;
	link: Link;
	color: Color;
}

export type FeaturedService = Pick<Service, "id" | "title" | "slug" | "description" | "icon"> & {
	documentId: string;
};

export interface FeaturedServicesBlock {
	__component: "block.featured-services";
	id: number;
	heading: Heading;
	services: FeaturedService[];
}

export interface FeaturedProject {
	id: number;
	title: string;
	slug: string;
	cover: Image;
}

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

export interface FeaturedArticle {
	id: number;
	title: string;
	slug: string;
	published_date: string;
	description: string;
	cover: Image;
}

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

export type Blocks =
	| HeroBlock
	| FeaturedServicesBlock
	| ListBlock
	| FeaturedOffersBlock
	| FullSectionBlock
	| FeaturedProjectsBlock
	| FaqBlock
	| FeaturedArticlesBlock
	| InfoBlock
	| CtaBlock;
