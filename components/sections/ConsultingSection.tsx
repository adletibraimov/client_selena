import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { hasSanityImage, SanityImage } from "@/components/ui/SanityImage";
import { getSectionId } from "@/lib/section-ids";
import type { ConsultingSection as ConsultingSectionType } from "@/lib/types";

type Props = {
  data: ConsultingSectionType;
};

export function ConsultingSection({ data }: Props) {
  const hasImage = hasSanityImage(data.image);

  return (
    <section
      id={getSectionId("consultingSection")}
      className="scroll-mt-24 bg-graphite py-20 text-ivory md:py-28"
    >
      <div
        className={[
          "mx-auto grid max-w-7xl items-center gap-12 px-5 md:gap-16 md:px-8",
          hasImage ? "md:grid-cols-2" : "",
        ].join(" ")}
      >
        <div>
          <SectionHeading
            eyebrow={data.eyebrow}
            title={data.title}
            description={data.description}
            tone="dark"
          />

          {data.features?.length ? (
            <ul className="mt-10 space-y-6">
              {data.features.map((feature) => (
                <li
                  key={feature._key}
                  className="border-t border-ivory/10 pt-5"
                >
                  <h3 className="font-serif text-xl text-ivory">
                    {feature.title}
                  </h3>
                  {feature.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-ivory/60">
                      {feature.description}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}

          {data.ctaLabel && data.ctaHref ? (
            <div className="mt-10">
              <CtaLink
                href={data.ctaHref}
                label={data.ctaLabel}
                variant="secondary"
                className="border-ivory/25 text-ivory hover:border-ivory/50 hover:bg-ivory/5"
              />
            </div>
          ) : null}
        </div>

        {hasImage ? (
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <SanityImage
              value={data.image}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
              alt={data.title || "Danışmanlık"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/40 via-transparent to-transparent" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
