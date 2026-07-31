import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";

export const contactSection = defineType({
  name: "contactSection",
  title: "İletişim",
  type: "object",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "İletişim",
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
      name: "formTitle",
      title: "Form Title",
      type: "string",
      initialValue: "Mesaj Gönderin",
    }),
    defineField({
      name: "formSubtext",
      title: "Form Subtext",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
      initialValue: "Mesajınız alındı. En kısa sürede dönüş yapacağız.",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "İletişim",
        subtitle: "Contact Section",
        media: EnvelopeIcon,
      };
    },
  },
});
