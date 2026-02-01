import type { StrapiBlocksContent } from "~/types/blocks";

export interface BlockContentSectionComponent {
	__component: "block.content-section";
	id: number;
	title: string;
	anchor: string;
	body: StrapiBlocksContent;
}
