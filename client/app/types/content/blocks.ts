import type { Button, Heading, Icon } from "../shared";
import type { BlockNode } from "#strapi-blocks-renderer/types";
import type { Color, Image, Link } from "../shared";
import type { AlignContent, Layout } from "../enums";
import type { Article, Project, Service, Subservice } from "./collections";

export interface ListItem {
	id: number;
	title: string;
	content: BlockNode[];
	image: Image;
	color?: Color;
}

export interface ListBlock {
	__component: "block.list";
	id: number;
	heading: Heading;
	show_numbers: boolean;
	layout: Layout;
	background?: Image;
	color?: Color;
	items: ListItem[];
}

export interface InfoBlock {
	__component: "block.info";
	id: number;
	image?: Image;
	align_content: AlignContent;
	reverse: boolean;
	content: BlockNode[];
	button?: Button;
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

export interface Hero {
	id: number;
	title: string;
	description?: string;
	badge?: string;
	colored_words?: Record<string, string>;
	align_content: AlignContent;
	background: Image;
	links?: Link[];
}

export interface HeroBlock extends Hero {
	__component: "block.hero";
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
	image: Image;
}

export interface FeaturedBlock {
	__component: "block.featured";
	id: number;
	heading: Heading;
	features: "tjänster" | "projekt" | "artiklar";
	services?: Service[];
	projects?: Project[];
	articles?: Article[];
}

export interface BuildItem {
	id: number;
	title: string;
	description?: string;
	price: number;
	icon?: Icon;
	subservices: Subservice[];
}

export interface ExamplesBuildBlock {
	__component: "block.examples-build";
	id: number;
	heading: Heading;
	button: Link;
	items: BuildItem[];
}

export interface Cta {
	id: number;
	title: string;
	subtitle?: string;
	description?: string;
	buttons?: Button[];
	links?: Link[];
	cover?: Image;
	color?: Color;
	background?: Color;
}

export interface CtaBlock extends Cta {
	__component: "block.cta";
}

export type MarketingBlocks = HeroBlock | CtaBlock | FullSectionBlock;

export type CollectionBlocks = InfoBlock | ListBlock | FaqBlock;

export type Blocks = MarketingBlocks | CollectionBlocks | FeaturedBlock | ExamplesBuildBlock;
