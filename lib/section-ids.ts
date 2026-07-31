import type { PageSection } from "./types";

const SECTION_IDS: Record<PageSection["_type"], string> = {
  heroSection: "ana-sayfa",
  aboutSection: "hakkimda",
  trainingsSection: "egitimler",
  consultingSection: "danismanlik",
  testimonialsSection: "yorumlar",
  contactSection: "iletisim",
};

export function getSectionId(type: PageSection["_type"]) {
  return SECTION_IDS[type];
}
