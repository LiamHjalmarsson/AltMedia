import type { Media } from "~/types/media";

export interface UiIconComponent {
	id: number;
	is_image: boolean;
	icon_name: string | null;
	image: Media | null;
}
