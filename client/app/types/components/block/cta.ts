import type { Media } from "~/types/media";
import type { StylesColorComponent } from "../styles/color";
import type { UiButtonComponent } from "../ui/button";
import type { UiLinkComponent } from "../ui/link";

export interface BlockCtaComponent {
	__component: "block.cta";
	id: number;
	title: string;
	subtitle?: string;
	description?: string;
	buttons?: UiButtonComponent[];
	links?: UiLinkComponent[];
	cover?: Media;
	color?: StylesColorComponent;
	background?: StylesColorComponent;
}
