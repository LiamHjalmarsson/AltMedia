import type { Icon } from "~/types/shared";

export interface Offer {
	id: number;
	title: string;
	description?: string;
	icon?: Icon;
	features?: string[];
	is_populare: boolean;
	start_price: number;
	month_price: number;
}
