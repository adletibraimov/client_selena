import { ImageIcon } from "@sanity/icons/Image";
import { defineArrayMember, defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaButtons",
      title: "CTA Buttons",
      type: "array",
      of: [defineArrayMember({ type: "ctaButton" })],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "carouselEnabled",
      title: "Enable Carousel",
      type: "boolean",
      initialValue: false,
      description: "When enabled, use slides instead of a single hero image.",
    }),
    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => Boolean(parent?.carouselEnabled),
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "slides",
      title: "Carousel Slides",
      type: "array",
      hidden: ({ parent }) => !parent?.carouselEnabled,
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt text",
                  type: "string",
                }),
              ],
            }),
            defineField({
              name: "title",
              title: "Slide Title",
              type: "string",
            }),
            defineField({
              name: "subtitle",
              title: "Slide Subtitle",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title", media: "image" },
            prepare({ title, media }) {
              return {
                title: title || "Slide",
                media,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "headline", media: "image" },
    prepare({ title, media }) {
      return {
        title: title || "Hero",
        subtitle: "Hero Section",
        media: media ?? ImageIcon,
      };
    },
  },
});
