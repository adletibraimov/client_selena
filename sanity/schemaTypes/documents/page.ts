import { DocumentIcon } from "@sanity/icons/Document";
import { defineArrayMember, defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Sayfa",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: "header", title: "Header (sabit)" },
    { name: "sections", title: "Bölümler", default: true },
    { name: "footer", title: "Footer (sabit)" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Sayfa Başlığı",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      initialValue: { current: "home" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headerConfig",
      title: "Header",
      type: "headerConfig",
      group: "header",
      description: "Header her zaman en üstte kalır; sırası değişmez.",
    }),
    defineField({
      name: "pageSections",
      title: "Sayfa Bölümleri",
      type: "array",
      group: "sections",
      description:
        "Bölüm ekleyin, silin veya sürükleyerek sıralayın. Sıra sitedeki sırayı belirler. Header/Footer buraya eklenmez.",
      of: [
        defineArrayMember({ type: "heroSection" }),
        defineArrayMember({ type: "aboutSection" }),
        defineArrayMember({ type: "trainingsSection" }),
        defineArrayMember({ type: "consultingSection" }),
        defineArrayMember({ type: "testimonialsSection" }),
        defineArrayMember({ type: "contactSection" }),
      ],
      options: {
        insertMenu: {
          views: [{ name: "list" }],
        },
      },
    }),
    defineField({
      name: "footerConfig",
      title: "Footer",
      type: "footerConfig",
      group: "footer",
      description: "Footer her zaman en altta kalır; sırası değişmez.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});

