import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

export const ctaButton = defineType({
  name: "ctaButton",
  title: "CTA Button",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Use #section-id for in-page anchors or a full URL.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Style",
      type: "string",
      initialValue: "primary",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
