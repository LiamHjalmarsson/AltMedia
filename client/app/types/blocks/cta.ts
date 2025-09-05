import type { Button, Link } from "../shared";

export interface FooterCta {
	title: string;
	description: string;
	buttons?: Button[];
	links?: Link[];
}
