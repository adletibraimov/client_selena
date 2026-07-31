import { SectionHeading } from "@/components/ui/SectionHeading";
import { hasSanityImage, SanityImage } from "@/components/ui/SanityImage";
import { getSectionId } from "@/lib/section-ids";
import type { TrainingsSection as TrainingsSectionType } from "@/lib/types";

type Props = {
  data: TrainingsSectionType;
};

export function TrainingsSection({ data }: Props) {
  return (
    <section
      id={getSectionId("trainingsSection")}
      className="scroll-mt-24 bg-[linear-gradient(180deg,#F7F4EE_0%,#FBF9F5_100%)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {(data.trainings ?? []).map((training) => {
            const content = (
              <>
                {hasSanityImage(training.image) ? (
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl">
                    <SanityImage
                      value={training.image}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 30vw"
                      alt={training.title}
                    />
                  </div>
                ) : null}
                {training.duration ? (
                  <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-taupe">
                    {training.duration}
                  </p>
                ) : null}
                <h3 className="font-serif text-2xl tracking-[-0.02em] text-cocoa">
                  {training.title}
                </h3>
                {training.description ? (
                  <p className="mt-3 text-sm leading-relaxed text-taupe">
                    {training.description}
                  </p>
                ) : null}
              </>
            );

            if (training.href) {
              return (
                <a
                  key={training._key}
                  href={training.href}
                  className="group block rounded-3xl p-2 transition hover:bg-ivory"
                >
                  {content}
                </a>
              );
            }

            return (
              <article key={training._key} className="group rounded-3xl p-2">
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
