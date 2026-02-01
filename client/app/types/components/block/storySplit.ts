import type { StrapiBlocksContent } from "~/types/blocks";
import type { Media } from "~/types/media";

export interface BlockStorySplitComponent {
	__component: "block.story-split";
	id: number;
	title: string;
	images: Media[] | null;
	reverse: boolean;
	content: StrapiBlocksContent;
}
