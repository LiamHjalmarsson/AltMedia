import type { Schema, Struct } from "@strapi/strapi";

export interface BlockItemsFaqItem extends Struct.ComponentSchema {
	collectionName: "components_block_items_faq_items";
	info: {
		displayName: "Faq Item";
	};
	attributes: {
		answer: Schema.Attribute.Blocks & Schema.Attribute.Required;
		question: Schema.Attribute.String & Schema.Attribute.Required;
	};
}

export interface BlockCta extends Struct.ComponentSchema {
	collectionName: "components_block_ctas";
	info: {
		displayName: "Cta";
	};
	attributes: {
		buttons: Schema.Attribute.Component<"ui.button", true>;
		description: Schema.Attribute.Text &
			Schema.Attribute.SetMinMaxLength<{
				minLength: 500;
			}>;
		links: Schema.Attribute.Component<"ui.link", true>;
		title: Schema.Attribute.String;
	};
}

export interface BlockFaq extends Struct.ComponentSchema {
	collectionName: "components_block_faqs";
	info: {
		displayName: "Faq";
	};
	attributes: {
		heading: Schema.Attribute.Component<"ui.heading", false>;
		icon: Schema.Attribute.Component<"ui.icon", false>;
		items: Schema.Attribute.Component<"block-items.faq-item", true>;
	};
}

export interface BlockFeaturedArticles extends Struct.ComponentSchema {
	collectionName: "components_block_featured_articles";
	info: {
		displayName: "Featured Articles";
	};
	attributes: {
		articles: Schema.Attribute.Relation<"oneToMany", "api::article.article">;
		heading: Schema.Attribute.Component<"ui.heading", false>;
	};
}

export interface BlockFeaturedOffers extends Struct.ComponentSchema {
	collectionName: "components_block_featured_offers";
	info: {
		displayName: "Featured Offers";
	};
	attributes: {
		heading: Schema.Attribute.Component<"ui.heading", false>;
		offers: Schema.Attribute.Relation<"oneToMany", "api::offer.offer">;
	};
}

export interface BlockFeaturedProjects extends Struct.ComponentSchema {
	collectionName: "components_block_featured_projects";
	info: {
		displayName: "Featured Projects";
	};
	attributes: {
		heading: Schema.Attribute.Component<"ui.heading", false>;
		projects: Schema.Attribute.Relation<"oneToMany", "api::project.project">;
	};
}

export interface BlockFeaturedServices extends Struct.ComponentSchema {
	collectionName: "components_block_featured_services";
	info: {
		displayName: "Featured Services";
	};
	attributes: {
		heading: Schema.Attribute.Component<"ui.heading", false>;
		services: Schema.Attribute.Relation<"oneToMany", "api::service.service">;
	};
}

export interface BlockFullSection extends Struct.ComponentSchema {
	collectionName: "components_block_full_sections";
	info: {
		displayName: "Full Section";
	};
	attributes: {
		color: Schema.Attribute.Component<"styles.color", false>;
		content: Schema.Attribute.Blocks;
		cover: Schema.Attribute.Media<"images" | "files" | "videos" | "audios">;
		link: Schema.Attribute.Component<"ui.link", false>;
		title: Schema.Attribute.String;
	};
}

export interface BlockHero extends Struct.ComponentSchema {
	collectionName: "components_block_heroes";
	info: {
		displayName: "Hero";
	};
	attributes: {
		align_content: Schema.Attribute.Enumeration<["left", "center", "right"]>;
		colored_words: Schema.Attribute.JSON;
		cover: Schema.Attribute.Media<"images" | "files" | "videos" | "audios", true>;
		description: Schema.Attribute.Text;
		form: Schema.Attribute.Component<"form.form", false>;
		has_form: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
		links: Schema.Attribute.Component<"ui.link", true>;
		title: Schema.Attribute.String;
	};
}

export interface BlockInfo extends Struct.ComponentSchema {
	collectionName: "components_block_infos";
	info: {
		displayName: "Info";
	};
	attributes: {
		align_content: Schema.Attribute.Enumeration<["left", "center", "right"]>;
		button: Schema.Attribute.Component<"ui.button", false>;
		content: Schema.Attribute.Blocks;
		image: Schema.Attribute.Media<"images" | "files" | "videos" | "audios">;
		reverse: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
	};
}

export interface BlockList extends Struct.ComponentSchema {
	collectionName: "components_block_lists";
	info: {
		displayName: "List";
	};
	attributes: {
		heading: Schema.Attribute.Component<"ui.heading", false>;
		items: Schema.Attribute.Component<"ui.card", true>;
	};
}

export interface FormForm extends Struct.ComponentSchema {
	collectionName: "components_form_forms";
	info: {
		displayName: "Form";
	};
	attributes: {
		button: Schema.Attribute.Component<"ui.button", false>;
		columns: Schema.Attribute.Integer;
		description: Schema.Attribute.Text;
		inputs: Schema.Attribute.Component<"form.input", true>;
		title: Schema.Attribute.String;
	};
}

export interface FormInput extends Struct.ComponentSchema {
	collectionName: "components_form_inputs";
	info: {
		displayName: "Input";
	};
	attributes: {
		column_span: Schema.Attribute.Enumeration<["full", "half", "two-thirds", "one-third"]> &
			Schema.Attribute.DefaultTo<"half">;
		input_type: Schema.Attribute.String;
		label: Schema.Attribute.String & Schema.Attribute.Required;
		name: Schema.Attribute.String;
		options: Schema.Attribute.JSON;
		placeholder: Schema.Attribute.String;
		required: Schema.Attribute.Boolean;
		rows: Schema.Attribute.Integer;
		select_multiple: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
		type: Schema.Attribute.Enumeration<["input", "textarea", "select"]>;
	};
}

export interface GlobalContact extends Struct.ComponentSchema {
	collectionName: "components_global_contacts";
	info: {
		displayName: "Contact";
	};
	attributes: {
		email: Schema.Attribute.Email;
		phone: Schema.Attribute.String;
		social_medias: Schema.Attribute.Component<"global.social-media", true>;
	};
}

export interface GlobalFooter extends Struct.ComponentSchema {
	collectionName: "components_global_footers";
	info: {
		displayName: "Footer";
	};
	attributes: {
		cta: Schema.Attribute.Component<"block.cta", false>;
		footer_columns: Schema.Attribute.Component<"global.footer-column", true>;
	};
}

export interface GlobalFooterColumn extends Struct.ComponentSchema {
	collectionName: "components_global_footer_columns";
	info: {
		displayName: "Footer Column";
	};
	attributes: {
		links: Schema.Attribute.Component<"global.menu-link", true>;
		title: Schema.Attribute.String;
		url: Schema.Attribute.String;
	};
}

export interface GlobalMenuLink extends Struct.ComponentSchema {
	collectionName: "components_global_menu_links";
	info: {
		displayName: "Menu Link";
	};
	attributes: {
		label: Schema.Attribute.String & Schema.Attribute.Required;
		url: Schema.Attribute.String & Schema.Attribute.Required;
	};
}

export interface GlobalNavigation extends Struct.ComponentSchema {
	collectionName: "components_global_navigations";
	info: {
		displayName: "Navigation";
	};
	attributes: {
		aria_label: Schema.Attribute.String;
		links: Schema.Attribute.Component<"global.menu-link", true>;
		logo: Schema.Attribute.Media<"images" | "files">;
	};
}

export interface GlobalSocialMedia extends Struct.ComponentSchema {
	collectionName: "components_global_social_medias";
	info: {
		displayName: "Social Media";
	};
	attributes: {
		icon: Schema.Attribute.Component<"ui.icon", false> & Schema.Attribute.Required;
		url: Schema.Attribute.String & Schema.Attribute.Required;
	};
}

export interface SectionsIntroduction extends Struct.ComponentSchema {
	collectionName: "components_sections_introductions";
	info: {
		displayName: "Introduction";
	};
	attributes: {
		description: Schema.Attribute.Blocks;
		subservices: Schema.Attribute.Relation<"oneToMany", "api::subservice.subservice">;
		subtitle: Schema.Attribute.String & Schema.Attribute.DefaultTo<"Vad vi gjort">;
		title: Schema.Attribute.String & Schema.Attribute.DefaultTo<"Om ">;
	};
}

export interface SeoSeo extends Struct.ComponentSchema {
	collectionName: "components_seo_seos";
	info: {
		displayName: "Seo";
	};
	attributes: {
		meta_canonical_url: Schema.Attribute.String;
		meta_description: Schema.Attribute.Text;
		meta_image: Schema.Attribute.Media<"images" | "files">;
		meta_title: Schema.Attribute.String;
		prevent_index: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
	};
}

export interface StylesColor extends Struct.ComponentSchema {
	collectionName: "components_styles_colors";
	info: {
		displayName: "Color";
	};
	attributes: {
		hex: Schema.Attribute.String;
		is_dark_text: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
		is_hex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
		type: Schema.Attribute.Enumeration<["primary", "secondary", "tertiary", "ghost"]> &
			Schema.Attribute.DefaultTo<"primary">;
	};
}

export interface UiButton extends Struct.ComponentSchema {
	collectionName: "components_ui_buttons";
	info: {
		displayName: "Button";
	};
	attributes: {
		aria_label: Schema.Attribute.String;
		icon: Schema.Attribute.Component<"ui.icon", false>;
		icon_is_position_right: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
		label: Schema.Attribute.String & Schema.Attribute.Required;
		size: Schema.Attribute.Enumeration<["ss", "xs", "sm", "md", "lg", "xl"]> & Schema.Attribute.DefaultTo<"md">;
		type: Schema.Attribute.Enumeration<["button", "submit", "reset"]> & Schema.Attribute.DefaultTo<"button">;
		variant: Schema.Attribute.Enumeration<["primary", "secondary", "tertiary", "ghost"]> &
			Schema.Attribute.DefaultTo<"primary">;
	};
}

export interface UiCard extends Struct.ComponentSchema {
	collectionName: "components_ui_cards";
	info: {
		displayName: "Card";
	};
	attributes: {
		content: Schema.Attribute.Blocks;
		icon: Schema.Attribute.Component<"ui.icon", false>;
		title: Schema.Attribute.String;
	};
}

export interface UiHeading extends Struct.ComponentSchema {
	collectionName: "components_ui_headings";
	info: {
		displayName: "Heading";
	};
	attributes: {
		align_content: Schema.Attribute.Enumeration<["left", "right", "center"]> & Schema.Attribute.DefaultTo<"left">;
		has_link: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
		link: Schema.Attribute.Component<"ui.link", false>;
		title: Schema.Attribute.String & Schema.Attribute.Required;
	};
}

export interface UiIcon extends Struct.ComponentSchema {
	collectionName: "components_ui_icons";
	info: {
		displayName: "Icon";
	};
	attributes: {
		icon_name: Schema.Attribute.String;
		image: Schema.Attribute.Media<"images" | "files" | "videos">;
		is_image: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
	};
}

export interface UiLink extends Struct.ComponentSchema {
	collectionName: "components_ui_links";
	info: {
		displayName: "Link";
	};
	attributes: {
		aria_label: Schema.Attribute.String;
		icon: Schema.Attribute.Component<"ui.icon", false>;
		icon_is_position_right: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
		is_external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
		label: Schema.Attribute.String;
		size: Schema.Attribute.Enumeration<["xxs", "xs", "sm", "md", "lg", "xl"]> & Schema.Attribute.DefaultTo<"md">;
		url: Schema.Attribute.String;
		variant: Schema.Attribute.Enumeration<["primary", "secondary"]>;
	};
}

declare module "@strapi/strapi" {
	export module Public {
		export interface ComponentSchemas {
			"block-items.faq-item": BlockItemsFaqItem;
			"block.cta": BlockCta;
			"block.faq": BlockFaq;
			"block.featured-articles": BlockFeaturedArticles;
			"block.featured-offers": BlockFeaturedOffers;
			"block.featured-projects": BlockFeaturedProjects;
			"block.featured-services": BlockFeaturedServices;
			"block.full-section": BlockFullSection;
			"block.hero": BlockHero;
			"block.info": BlockInfo;
			"block.list": BlockList;
			"form.form": FormForm;
			"form.input": FormInput;
			"global.contact": GlobalContact;
			"global.footer": GlobalFooter;
			"global.footer-column": GlobalFooterColumn;
			"global.menu-link": GlobalMenuLink;
			"global.navigation": GlobalNavigation;
			"global.social-media": GlobalSocialMedia;
			"sections.introduction": SectionsIntroduction;
			"seo.seo": SeoSeo;
			"styles.color": StylesColor;
			"ui.button": UiButton;
			"ui.card": UiCard;
			"ui.heading": UiHeading;
			"ui.icon": UiIcon;
			"ui.link": UiLink;
		}
	}
}

