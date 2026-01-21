import type { AlignContent } from "./enums";
import type { Seo } from "./shared/seo";

export interface MetaPage {
	id: string;
	title: string;
	description?: string;
	slug?: string;
	align_content?: AlignContent;
	seo?: Seo;
}

export interface PageContent {
	id: number;
	title: string;
	description?: string;
	slug?: string;
	align_content?: AlignContent;
	seo?: Seo | null;
}
