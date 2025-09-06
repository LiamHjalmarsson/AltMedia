import type { Offer } from "../collections/offer";
import type { Heading, Icon } from "../shared";

export interface FeaturedService {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	description: string;
	icon: Icon;
}

export interface FeaturedServicesBlock {
	__component: "block.featured-services";
	id: number;
	heading: Heading;
	services: FeaturedService[];
}

export interface FeaturedOffersBlock {
	__component: "block.featured-offers";
	id: number;
	heading: Heading;
	offers: Offer[];
}
