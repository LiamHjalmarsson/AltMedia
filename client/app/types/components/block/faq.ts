import type { StrapiBlocksContent } from "~/types/blocks";
import type { UiHeadingComponent } from "../ui/heading";

export interface FaqItemComponent {
	id: number;
	question: string;
	answer: StrapiBlocksContent;
}

export interface BlockFaqComponent {
	__component: "block.faq";
	id: number;
	heading: UiHeadingComponent;
	items: FaqItemComponent[];
}
