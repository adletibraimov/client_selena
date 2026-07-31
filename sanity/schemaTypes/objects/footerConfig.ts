import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { defineArrayMember, defineField, defineType } from "sanity";

export const footerConfig = defineType({
  name: "footerConfig",
  title: "Footer",
  type: "object",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "email",
      title: "Email (görünen)",
      type: "string",
      description: "Footer’da görünen e-posta adresi.",
    }),
    defineField({
      name: "formRecipientEmail",
      title: "Form alıcı e-postası",
      type: "string",
      description:
        "İletişim formundan gelen mesajların gideceği adres (CONTACT TO).",
      validation: (rule) =>
        rule.email().warning("Geçerli bir e-posta girin."),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),

    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "Digits only with country code, e.g. 905551234567",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
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
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "string",
    }),
  ],
});
