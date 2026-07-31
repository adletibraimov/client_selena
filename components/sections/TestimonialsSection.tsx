import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialsMarquee } from "@/components/sections/TestimonialsMarquee";
import { getSectionId } from "@/lib/section-ids";
import type { TestimonialsSection as TestimonialsSectionType } from "@/lib/types";

type Props = {
  data: TestimonialsSectionType;
};

export function TestimonialsSection({ data }: Props) {
  const items = data.testimonials ?? [];

  return (
    <section
      id={getSectionId("testimonialsSection")}
      className="scroll-mt-24 overflow-hidden py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
        />
      </div>

      {items.length ? (
        <div className="mt-12 md:mt-16">
          <TestimonialsMarquee items={items} />
        </div>
      ) : null}
    </section>
  );
}
