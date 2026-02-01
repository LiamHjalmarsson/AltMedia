import type { UiSocialMediaComponent } from "../components/global/contactDetails";

export interface TeamMember {
	id: number;
	firstname: string;
	lastname: string;
	roles: string[];
	bio?: string;
	email?: string;
	phone?: string;
	social_medias?: UiSocialMediaComponent[];
}
