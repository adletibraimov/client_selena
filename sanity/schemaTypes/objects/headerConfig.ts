import { MenuIcon } from "@sanity/icons/Menu";
import { defineArrayMember, defineField, defineType } from "sanity";

export const headerConfig = defineType({
  name: "headerConfig",
  title: "Header",
  type: "object",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
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
      name: "navItems",
      title: "Navigation Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "Anchor / Link",
              type: "string",
              description: "e.g. #hakkimda, #egitimler",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
    }),
  ],
});
