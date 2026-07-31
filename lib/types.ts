export type SanityImage = {
  alt?: string | null;
  asset?: {
    _id?: string;
    url?: string;
    metadata?: {
      lqip?: string | null;
      dimensions?: {
        width?: number;
        height?: number;
        aspectRatio?: number;
      } | null;
    } | null;
  } | null;
} | null;

export type CtaButton = {
  _key: string;
  label: string;
  href: string;
  variant?: "primary" | "secondary" | string | null;
};

export type NavItem = {
  _key: string;
  label: string;
  href: string;
};

export type HeaderConfig = {
  brandName?: string | null;
  logo?: SanityImage;
  navItems?: NavItem[] | null;
} | null;

export type FooterConfig = {
  brandName?: string | null;
  tagline?: string | null;
  email?: string | null;
  formRecipientEmail?: string | null;
  phone?: string | null;
  whatsappNumber?: string | null;
  address?: string | null;
  socialLinks?:
    | {
        _key: string;
        label: string;
        href: string;
      }[]
    | null;
  copyright?: string | null;
} | null;

export type HeroSection = {
  _key: string;
  _type: "heroSection";
  headline?: string | null;
  subheadline?: string | null;
  ctaButtons?: CtaButton[] | null;
  carouselEnabled?: boolean | null;
  image?: SanityImage;
  slides?:
    | {
        _key: string;
        title?: string | null;
        subtitle?: string | null;
        image?: SanityImage;
      }[]
    | null;
};

export type AboutSection = {
  _key: string;
  _type: "aboutSection";
  eyebrow?: string | null;
  title?: string | null;
  bio?: string | null;
  image?: SanityImage;
  stats?:
    | {
        _key: string;
        value: string;
        label: string;
      }[]
    | null;
};

export type TrainingsSection = {
  _key: string;
  _type: "trainingsSection";
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  trainings?:
    | {
        _key: string;
        title: string;
        description?: string | null;
        duration?: string | null;
        image?: SanityImage;
        href?: string | null;
      }[]
    | null;
};

export type ConsultingSection = {
  _key: string;
  _type: "consultingSection";
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  features?:
    | {
        _key: string;
        title: string;
        description?: string | null;
      }[]
    | null;
  image?: SanityImage;
  ctaLabel?: string | null;
  ctaHref?: string | null;
};

export type TestimonialsSection = {
  _key: string;
  _type: "testimonialsSection";
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  testimonials?:
    | {
        _key: string;
        quote: string;
        name: string;
        role?: string | null;
        image?: SanityImage;
      }[]
    | null;
};

export type ContactSection = {
  _key: string;
  _type: "contactSection";
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  formTitle?: string | null;
  formSubtext?: string | null;
  successMessage?: string | null;
};

export type PageSection =
  | HeroSection
  | AboutSection
  | TrainingsSection
  | ConsultingSection
  | TestimonialsSection
  | ContactSection;

export type PageData = {
  _id?: string;
  title?: string | null;
  slug?: { current?: string | null } | null;
  headerConfig?: HeaderConfig;
  pageSections?: PageSection[] | null;
  footerConfig?: FooterConfig;
};
