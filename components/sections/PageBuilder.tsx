import { AboutSection } from "@/components/sections/AboutSection";
import { ConsultingSection } from "@/components/sections/ConsultingSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrainingsSection } from "@/components/sections/TrainingsSection";
import type { PageSection } from "@/lib/types";

type Props = {
  sections?: PageSection[] | null;
  brandName?: string | null;
};

export function PageBuilder({ sections, brandName }: Props) {
  if (!sections?.length) return null;

  return (
    <main>
      {sections.map((section) => {
        switch (section._type) {
          case "heroSection":
            return (
              <HeroSection
                key={section._key}
                data={section}
                brandName={brandName}
              />
            );
          case "aboutSection":
            return <AboutSection key={section._key} data={section} />;
          case "trainingsSection":
            return <TrainingsSection key={section._key} data={section} />;
          case "consultingSection":
            return <ConsultingSection key={section._key} data={section} />;
          case "testimonialsSection":
            return <TestimonialsSection key={section._key} data={section} />;
          case "contactSection":
            return <ContactSection key={section._key} data={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
