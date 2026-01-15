import type { Schema, Struct } from '@strapi/strapi';

export interface BlockItemsBuildItem extends Struct.ComponentSchema {
  collectionName: 'components_block_items_build_items';
  info: {
    displayName: 'Build Item';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Component<'ui.icon', false>;
    subservices: Schema.Attribute.Relation<
      'oneToMany',
      'api::subservice.subservice'
    >;
    title: Schema.Attribute.String;
  };
}

export interface BlockItemsFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_block_items_faq_items';
  info: {
    displayName: 'Faq Item';
  };
  attributes: {
    answer: Schema.Attribute.Blocks & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockItemsListItem extends Struct.ComponentSchema {
  collectionName: 'components_block_items_list_items';
  info: {
    displayName: 'List item';
    icon: 'bulletList';
  };
  attributes: {
    color: Schema.Attribute.Component<'styles.color', false>;
    content: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface BlockCta extends Struct.ComponentSchema {
  collectionName: 'components_block_ctas';
  info: {
    displayName: 'Cta';
  };
  attributes: {
    background: Schema.Attribute.Component<'styles.color', false>;
    buttons: Schema.Attribute.Component<'ui.button', true>;
    color: Schema.Attribute.Component<'styles.color', false>;
    cover: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    description: Schema.Attribute.Text;
    links: Schema.Attribute.Component<'ui.link', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlockExamplesBuild extends Struct.ComponentSchema {
  collectionName: 'components_block_examples_builds';
  info: {
    displayName: 'Examples Build';
    icon: 'bulletList';
  };
  attributes: {
    button: Schema.Attribute.Component<'ui.link', false>;
    heading: Schema.Attribute.Component<'ui.heading', false>;
    items: Schema.Attribute.Component<'block-items.build-item', true>;
  };
}

export interface BlockFaq extends Struct.ComponentSchema {
  collectionName: 'components_block_faqs';
  info: {
    displayName: 'Faq';
  };
  attributes: {
    heading: Schema.Attribute.Component<'ui.heading', false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    items: Schema.Attribute.Component<'block-items.faq-item', true>;
  };
}

export interface BlockFeatured extends Struct.ComponentSchema {
  collectionName: 'components_block_featureds';
  info: {
    displayName: 'Featured';
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    features: Schema.Attribute.Enumeration<
      ['tj\u00E4nster', 'projekt', 'artiklar']
    > &
      Schema.Attribute.Required;
    heading: Schema.Attribute.Component<'ui.heading', false>;
    projects: Schema.Attribute.Relation<'oneToMany', 'api::project.project'>;
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
  };
}

export interface BlockFullSection extends Struct.ComponentSchema {
  collectionName: 'components_block_full_sections';
  info: {
    displayName: 'Full Section';
  };
  attributes: {
    color: Schema.Attribute.Component<'styles.color', false>;
    content: Schema.Attribute.Blocks;
    cover: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.Component<'ui.link', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlockHero extends Struct.ComponentSchema {
  collectionName: 'components_block_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    align_content: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    badge: Schema.Attribute.String;
    color: Schema.Attribute.Component<'styles.color', false>;
    colored_words: Schema.Attribute.JSON;
    description: Schema.Attribute.Text;
    links: Schema.Attribute.Component<'ui.link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockInfo extends Struct.ComponentSchema {
  collectionName: 'components_block_infos';
  info: {
    displayName: 'Info';
  };
  attributes: {
    align_content: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    button: Schema.Attribute.Component<'ui.button', false>;
    content: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    reverse: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface BlockList extends Struct.ComponentSchema {
  collectionName: 'components_block_lists';
  info: {
    displayName: 'List';
  };
  attributes: {
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    color: Schema.Attribute.Component<'styles.color', false>;
    heading: Schema.Attribute.Component<'ui.heading', false>;
    items: Schema.Attribute.Component<'block-items.list-item', true>;
    layout: Schema.Attribute.Enumeration<['alternating', 'grid']> &
      Schema.Attribute.DefaultTo<'alternating'>;
    show_numbers: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface FormForm extends Struct.ComponentSchema {
  collectionName: 'components_form_forms';
  info: {
    displayName: 'Form';
  };
  attributes: {
    button: Schema.Attribute.Component<'ui.button', false>;
    columns: Schema.Attribute.Integer;
    description: Schema.Attribute.Text;
    inputs: Schema.Attribute.Component<'form.input', true>;
    title: Schema.Attribute.String;
  };
}

export interface FormInput extends Struct.ComponentSchema {
  collectionName: 'components_form_inputs';
  info: {
    displayName: 'Input';
  };
  attributes: {
    column_span: Schema.Attribute.Enumeration<
      ['full', 'half', 'two-thirds', 'one-third']
    > &
      Schema.Attribute.DefaultTo<'half'>;
    input_type: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String;
    options: Schema.Attribute.JSON;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    rows: Schema.Attribute.Integer;
    select_multiple: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    type: Schema.Attribute.Enumeration<['input', 'textarea', 'select']>;
  };
}

export interface GlobalContact extends Struct.ComponentSchema {
  collectionName: 'components_global_contacts';
  info: {
    displayName: 'Contact';
  };
  attributes: {
    email: Schema.Attribute.Email;
    phone: Schema.Attribute.String;
    social_medias: Schema.Attribute.Component<'global.social-media', true>;
  };
}

export interface GlobalFooter extends Struct.ComponentSchema {
  collectionName: 'components_global_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    cta: Schema.Attribute.Component<'block.cta', false>;
    description: Schema.Attribute.Text;
    footer_columns: Schema.Attribute.Component<'global.footer-column', true>;
    logo: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface GlobalFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_global_footer_columns';
  info: {
    displayName: 'Footer Column';
  };
  attributes: {
    links: Schema.Attribute.Component<'global.menu-link', true>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface GlobalMenuLink extends Struct.ComponentSchema {
  collectionName: 'components_global_menu_links';
  info: {
    displayName: 'Menu Link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GlobalNavigation extends Struct.ComponentSchema {
  collectionName: 'components_global_navigations';
  info: {
    displayName: 'Navigation';
  };
  attributes: {
    aria_label: Schema.Attribute.String;
    links: Schema.Attribute.Component<'global.menu-link', true>;
    logo: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface GlobalSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_global_social_medias';
  info: {
    displayName: 'Social Media';
  };
  attributes: {
    icon: Schema.Attribute.Component<'ui.icon', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProjectBuildConditional extends Struct.ComponentSchema {
  collectionName: 'components_project-build_conditionals';
  info: {
    displayName: 'Conditional';
  };
  attributes: {
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 2;
      }>;
    placeholder: Schema.Attribute.String;
    trigger_value: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['input', 'textarea', 'number', 'url']> &
      Schema.Attribute.DefaultTo<'input'>;
  };
}

export interface ProjectBuildOption extends Struct.ComponentSchema {
  collectionName: 'components_project-build_options';
  info: {
    displayName: 'Option';
  };
  attributes: {
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
  };
}

export interface ProjectBuildQuestion extends Struct.ComponentSchema {
  collectionName: 'components_project-build_questions';
  info: {
    displayName: 'Question';
  };
  attributes: {
    conditional: Schema.Attribute.Component<'project-build.conditional', false>;
    help_text: Schema.Attribute.String;
    input: Schema.Attribute.Component<'form.input', false>;
    options: Schema.Attribute.Component<'project-build.option', true>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 2;
      }>;
    type: Schema.Attribute.Enumeration<
      ['boolean', 'single', 'textarea', 'input']
    >;
  };
}

export interface ProjectBuildStep extends Struct.ComponentSchema {
  collectionName: 'components_project-build_steps';
  info: {
    displayName: 'Step';
  };
  attributes: {
    clickable_relations: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    description: Schema.Attribute.Text;
    order: Schema.Attribute.Integer;
    questions: Schema.Attribute.Component<'project-build.question', true>;
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
    subservices: Schema.Attribute.Relation<
      'oneToMany',
      'api::subservice.subservice'
    >;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 2;
      }>;
    type: Schema.Attribute.Enumeration<['form', 'relations']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'form'>;
  };
}

export interface SectionsIntroduction extends Struct.ComponentSchema {
  collectionName: 'components_sections_introductions';
  info: {
    displayName: 'Introduction';
  };
  attributes: {
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    subservices: Schema.Attribute.Relation<
      'oneToMany',
      'api::subservice.subservice'
    >;
    subtitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Vad vi gjort'>;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Om '>;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    meta_canonical_url: Schema.Attribute.String;
    meta_description: Schema.Attribute.Text & Schema.Attribute.Required;
    meta_image: Schema.Attribute.Media<'images' | 'files'>;
    meta_title: Schema.Attribute.String & Schema.Attribute.Required;
    prevent_index: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface StylesColor extends Struct.ComponentSchema {
  collectionName: 'components_styles_colors';
  info: {
    displayName: 'Color';
  };
  attributes: {
    hex: Schema.Attribute.String;
    theme: Schema.Attribute.Enumeration<['light', 'dark', 'gradient']> &
      Schema.Attribute.DefaultTo<'dark'>;
    type: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'tertiary', 'ghost', 'outline', 'white', 'black']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface UiButton extends Struct.ComponentSchema {
  collectionName: 'components_ui_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    reversed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    size: Schema.Attribute.Enumeration<['xs', 'sm', 'md', 'lg', 'xl']> &
      Schema.Attribute.DefaultTo<'lg'>;
    type: Schema.Attribute.Enumeration<['button', 'submit', 'reset']> &
      Schema.Attribute.DefaultTo<'button'>;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline', 'ghost']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface UiCard extends Struct.ComponentSchema {
  collectionName: 'components_ui_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    icon: Schema.Attribute.Component<'ui.icon', false>;
    title: Schema.Attribute.String;
  };
}

export interface UiHeading extends Struct.ComponentSchema {
  collectionName: 'components_ui_headings';
  info: {
    displayName: 'Heading';
  };
  attributes: {
    align_content: Schema.Attribute.Enumeration<['left', 'right', 'center']> &
      Schema.Attribute.DefaultTo<'left'>;
    description: Schema.Attribute.Text;
    has_link: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.Component<'ui.link', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiIcon extends Struct.ComponentSchema {
  collectionName: 'components_ui_icons';
  info: {
    displayName: 'Icon';
  };
  attributes: {
    icon_name: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    is_image: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface UiLink extends Struct.ComponentSchema {
  collectionName: 'components_ui_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    icon: Schema.Attribute.String;
    is_external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    reversed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    size: Schema.Attribute.Enumeration<['xs', 'sm', 'md', 'lg', 'xl']> &
      Schema.Attribute.DefaultTo<'lg'>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline', 'ghost']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'block-items.build-item': BlockItemsBuildItem;
      'block-items.faq-item': BlockItemsFaqItem;
      'block-items.list-item': BlockItemsListItem;
      'block.cta': BlockCta;
      'block.examples-build': BlockExamplesBuild;
      'block.faq': BlockFaq;
      'block.featured': BlockFeatured;
      'block.full-section': BlockFullSection;
      'block.hero': BlockHero;
      'block.info': BlockInfo;
      'block.list': BlockList;
      'form.form': FormForm;
      'form.input': FormInput;
      'global.contact': GlobalContact;
      'global.footer': GlobalFooter;
      'global.footer-column': GlobalFooterColumn;
      'global.menu-link': GlobalMenuLink;
      'global.navigation': GlobalNavigation;
      'global.social-media': GlobalSocialMedia;
      'project-build.conditional': ProjectBuildConditional;
      'project-build.option': ProjectBuildOption;
      'project-build.question': ProjectBuildQuestion;
      'project-build.step': ProjectBuildStep;
      'sections.introduction': SectionsIntroduction;
      'seo.seo': SeoSeo;
      'styles.color': StylesColor;
      'ui.button': UiButton;
      'ui.card': UiCard;
      'ui.heading': UiHeading;
      'ui.icon': UiIcon;
      'ui.link': UiLink;
    }
  }
}
