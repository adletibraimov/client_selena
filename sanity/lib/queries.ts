import { defineQuery } from "next-sanity";

const imageProjection = /* groq */ `{
  ...,
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  }
}`;

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "page" && (_id == "homePage" || slug.current == "home")][0]{
    _id,
    title,
    slug,
    headerConfig{
      brandName,
      logo${imageProjection},
      navItems[]{
        _key,
        label,
        href
      }
    },
    pageSections[]{
      _key,
      _type,
      ...,
      _type == "heroSection" => {
        headline,
        subheadline,
        ctaButtons[]{
          _key,
          label,
          href,
          variant
        },
        carouselEnabled,
        image${imageProjection},
        slides[]{
          _key,
          title,
          subtitle,
          image${imageProjection}
        }
      },
      _type == "aboutSection" => {
        eyebrow,
        title,
        bio,
        image${imageProjection},
        stats[]{
          _key,
          value,
          label
        }
      },
      _type == "trainingsSection" => {
        eyebrow,
        title,
        description,
        trainings[]{
          _key,
          title,
          description,
          duration,
          image${imageProjection},
          href
        }
      },
      _type == "consultingSection" => {
        eyebrow,
        title,
        description,
        features[]{
          _key,
          title,
          description
        },
        image${imageProjection},
        ctaLabel,
        ctaHref
      },
      _type == "testimonialsSection" => {
        eyebrow,
        title,
        description,
        testimonials[]{
          _key,
          quote,
          name,
          role,
          image${imageProjection}
        }
      },
      _type == "contactSection" => {
        eyebrow,
        title,
        description,
        formTitle,
        formSubtext,
        successMessage
      }
    },
    footerConfig{
      brandName,
      tagline,
      email,
      formRecipientEmail,
      phone,
      whatsappNumber,
      address,
      socialLinks[]{
        _key,
        label,
        href
      },
      copyright
    }
  }
`);
