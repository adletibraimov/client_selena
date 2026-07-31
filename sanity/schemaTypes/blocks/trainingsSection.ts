import { BookIcon } from "@sanity/icons/Book";
import { defineArrayMember, defineField, defineType } from "sanity";

export const trainingsSection = defineType({
  name: "trainingsSection",
  title: "Eğitimler",
  type: "object",
  icon: BookIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Eğitimler",
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
      rows: 3,
    }),
    defineField({
      name: "trainings",
      title: "Trainings",
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
              rows: 3,
            }),
            defineField({
              name: "duration",
              title: "Duration",
              type: "string",
              description: "e.g. 6 Hafta, 3 Gün",
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
              name: "href",
              title: "Link",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "duration", media: "image" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "Eğitimler",
        subtitle: "Trainings Section",
        media: BookIcon,
      };
    },
  },
});
