import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("İçerik")
    .items([
      S.listItem()
        .title("Ana Sayfa")
        .id("homePage")
        .child(
          S.document()
            .schemaType("page")
            .documentId("homePage")
            .title("Ana Sayfa"),
        ),
      S.divider(),
      S.listItem()
        .title("Tüm Sayfalar")
        .child(S.documentTypeList("page").title("Sayfalar")),
    ]);
