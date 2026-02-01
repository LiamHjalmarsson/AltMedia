import type { UiIconComponent } from "../ui/icon";

export interface UiContactComponent {
	id: number;
	email?: string;
	phone?: string;
	social_medias?: UiSocialMediaComponent[];
}

export interface UiSocialMediaComponent {
	id: number;
	title: string;
	url: string;
	icon: UiIconComponent;
}
