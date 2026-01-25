import type { BlockNode } from "#strapi-blocks-renderer/types";
import type { AlignContent, Layout } from "../enums";
import type { Image } from "../shared/media";
import type { Color } from "../shared/styles";
import type { Button, Heading, Icon, Link } from "../shared/ui";
import type { Article, Project, Service, Subservice } from "./collections";

// List
export interface ListItem {
	id: number;
	title: string;
	content: BlockNode[];
	image?: Image | null;
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

// Info

export interface InfoBlock {
	__component: "block.info";
	id: number;
	image?: Image;
	align_content: AlignContent;
	reverse: boolean;
	content: BlockNode[];
	button?: Button;
	image_fade?: "top" | "bottom" | "right" | "left" | "all" | "none" | null;
}

// Story Split

export interface StorySplitBlock {
	__component: "block.story-split";
	id: number;
	title: string;
	images?: Image[];
	reverse: boolean;
	content: BlockNode[];
}

// Full Section
export interface FullSectionBlock {
	__component: "block.full-section";
	id: number;
	title: string;
	content: BlockNode[];
	cover?: Image | null;
	link?: Link | null;
	color?: Color | null;
}

// Hero
export interface Hero {
	id: number;
	title: string;
	description?: string;
	colored_words?: Record<string, string>;
	align_content: AlignContent;
	background?: Image | null;
	links?: Link[];
	color?: Color;
}

export interface HeroBlock extends Hero {
	__component: "block.hero";
}

// FAQ
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
}

//  Featured
export interface FeaturedBlock {
	__component: "block.featured";
	id: number;
	heading: Heading;
	features: "tjänster" | "projekt" | "artiklar";
	services?: Service[];
	projects?: Project[];
	articles?: Article[];
}

//  Examples Build
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

// CTA
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

export type Blocks =
	| HeroBlock
	| CtaBlock
	| FullSectionBlock
	| InfoBlock
	| ListBlock
	| FaqBlock
	| FeaturedBlock
	| ExamplesBuildBlock;
