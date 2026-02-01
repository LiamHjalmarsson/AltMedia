import type { SeoComponent } from "./components/seo/seo";
import type { AlignContent } from "./enums";

export interface MetaPage {
	id: string;
	title: string;
	description?: string;
	slug?: string;
	align_content?: AlignContent;
	seo?: SeoComponent;
}

export interface PageContent {
	id: number;
	title: string;
	description?: string;
	slug?: string;
	align_content?: AlignContent;
	seo?: SeoComponent | null;
}
