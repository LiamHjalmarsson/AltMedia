import type { Media } from "~/types/media";

export interface SeoComponent {
	id: number;
	meta_title: string;
	meta_description: string;
	meta_image: Media;
	meta_canonical_url: string | null;
	prevent_index: boolean;
}
