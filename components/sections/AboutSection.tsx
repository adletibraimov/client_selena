import { SectionHeading } from "@/components/ui/SectionHeading";
import { hasSanityImage, SanityImage } from "@/components/ui/SanityImage";
import { getSectionId } from "@/lib/section-ids";
import type { AboutSection as AboutSectionType } from "@/lib/types";

type Props = {
  data: AboutSectionType;
};

export function AboutSection({ data }: Props) {
  const hasImage = hasSanityImage(data.image);

  return (
    <section
      id={getSectionId("aboutSection")}
      className="scroll-mt-24 border-t border-cocoa/8 py-20 md:py-28"
    >
      <div
        className={[
          "mx-auto grid max-w-7xl items-center gap-12 px-5 md:gap-16 md:px-8",
          hasImage ? "md:grid-cols-2" : "",
        ].join(" ")}
      >
        {hasImage ? (
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <SanityImage
              value={data.image}
              fill
              width={1200}
              height={1500}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
              alt={data.title || "Hakkımda"}
            />
          </div>
        ) : null}

        <div>
          <SectionHeading
            eyebrow={data.eyebrow}
            title={data.title}
            description={data.bio}
          />

          {data.stats?.length ? (
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-cocoa/10 pt-8">
              {data.stats.map((stat) => (
                <div key={stat._key}>
                  <dt className="font-serif text-3xl text-cocoa md:text-4xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 text-xs uppercase tracking-[0.16em] text-taupe">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </section>
  );
}
