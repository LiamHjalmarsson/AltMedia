import type { StrapiBlocksContent } from "~/types/blocks";
import type { AlignContent, ImageFade } from "~/types/enums";
import type { Media } from "~/types/media";
import type { UiButtonComponent } from "../ui/button";

export interface BlockInfoComponent {
	__component: "block.info";
	id: number;
	image: Media;
	align_content: AlignContent;
	reverse: boolean;
	content: StrapiBlocksContent | null;
	button: UiButtonComponent | null;
	image_fade: ImageFade;
}
