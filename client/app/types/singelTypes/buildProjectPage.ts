import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { UiStepComponent } from "../components/buildProject/step";
import type { SeoComponent } from "../components/seo/seo";

export interface BuildProjectPage {
	id: number;
	steps: UiStepComponent[];
	show_summary_panel: boolean;
	message?: string;
	seo?: SeoComponent;
}

export type BuildProjectPageResponse = Strapi5ResponseSingle<BuildProjectPage>;
