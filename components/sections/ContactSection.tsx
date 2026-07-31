import { ContactForm } from "@/components/ui/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSectionId } from "@/lib/section-ids";
import type { ContactSection as ContactSectionType } from "@/lib/types";

type Props = {
  data: ContactSectionType;
};

export function ContactSection({ data }: Props) {
  return (
    <section
      id={getSectionId("contactSection")}
      className="scroll-mt-24 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[0.9fr_1.1fr] md:items-start md:gap-16 md:px-8">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
        />
        <ContactForm
          formTitle={data.formTitle}
          formSubtext={data.formSubtext}
          successMessage={data.successMessage}
        />
      </div>
    </section>
  );
}
