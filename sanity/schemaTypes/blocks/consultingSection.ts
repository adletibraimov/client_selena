import { CommentIcon } from "@sanity/icons/Comment";
import { defineArrayMember, defineField, defineType } from "sanity";

export const consultingSection = defineType({
  name: "consultingSection",
  title: "Bire Bir Danışmanlık",
  type: "object",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Bire Bir Danışmanlık",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        }),
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      initialValue: "Randevu Al",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
      initialValue: "#iletisim",
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
    prepare({ title, media }) {
      return {
        title: title || "Bire Bir Danışmanlık",
        subtitle: "Consulting Section",
        media: media ?? CommentIcon,
      };
    },
  },
});
