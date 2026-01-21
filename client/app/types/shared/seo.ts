import type { Image } from "./media";

export interface Seo {
	id: number;
	meta_title: string;
	meta_description?: string;
	meta_canonical_url?: string | null;
	prevent_index?: boolean;
	meta_image?: Image | null;
}
