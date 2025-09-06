import type { AlignContent } from "../enums";
import type { Form, Image, Link } from "../shared";

export interface Hero {
	id: number;
	title: string;
	description: string;
	colored_words: {};
	cover: Image[];
	align_content: AlignContent;
	links: Link[];
	has_form: boolean;
	form: Form;
}

export interface HeroBlock extends Hero {
	__component: "block.hero";
}
