import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { UiContactComponent } from "../components/global/contactDetails";
import type { UiFooterComponent } from "../components/global/footer";
import type { UiNavigationComponent } from "../components/global/navigation";
import type { SeoComponent } from "../components/seo/seo";

export interface GlobalConfig {
	id: number;
	site_name: string;
	favicon: {
		id: number;
		url: string;
	};
	navigation: UiNavigationComponent;
	footer: UiFooterComponent;
	contact?: UiContactComponent;
	seo: SeoComponent;
}

export type GlobalConfigResponse = Strapi5ResponseSingle<GlobalConfig>;
