import type { StrapiBlocksContent } from "~/types/blocks";
import type { UiHeadingComponent } from "../ui/heading";

export interface BlockIntroductionComponent {
	__component: "block.introduction";
	id: number;
	heading: UiHeadingComponent;
	content: StrapiBlocksContent;
}
