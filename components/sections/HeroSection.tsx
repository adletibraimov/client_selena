import { stegaClean } from "next-sanity";

import { CtaLink } from "@/components/ui/CtaLink";
import { hasSanityImage, SanityImage } from "@/components/ui/SanityImage";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { getSectionId } from "@/lib/section-ids";
import type { HeroSection as HeroSectionType } from "@/lib/types";

type Props = {
  data: HeroSectionType;
  brandName?: string | null;
};

export function HeroSection({ data, brandName }: Props) {
  const carouselEnabled = Boolean(stegaClean(data.carouselEnabled));
  const slides =
    data.slides?.filter((slide) => hasSanityImage(slide.image)) ?? [];
  const showCarousel = carouselEnabled && slides.length > 0;
  const showImage = !showCarousel && hasSanityImage(data.image);
  const hasMedia = showCarousel || showImage;
  const brand = brandName || "Selena";

  return (
    <section
      id={getSectionId("heroSection")}
      className="relative min-h-[100svh] overflow-hidden"
    >
      {hasMedia ? (
        <div className="absolute inset-0">
          {showCarousel ? (
            <HeroCarousel slides={slides} />
          ) : (
            <SanityImage
              value={data.image}
              fill
              width={2000}
              height={1400}
              priority
              className="object-cover"
              sizes="100vw"
              alt={data.headline || brand}
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(251,249,245,0.94)_0%,rgba(251,249,245,0.72)_42%,rgba(251,249,245,0.18)_68%,rgba(34,32,29,0.22)_100%)]" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(44,40,37,0.06),transparent_42%),radial-gradient(circle_at_85%_10%,rgba(120,115,110,0.12),transparent_35%)]" />
      )}

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-5 pb-28 pt-36 md:items-center md:px-8 md:pb-24 md:pt-28">
        <div className="animate-fade-up max-w-xl">
          <p className="mb-5 font-serif text-5xl tracking-[-0.04em] text-cocoa md:text-6xl lg:text-7xl">
            {brand}
          </p>
          <h1 className="max-w-xl font-serif text-4xl leading-[1.08] tracking-[-0.03em] text-cocoa md:text-5xl lg:text-[3.5rem]">
            {data.headline}
          </h1>
          {data.subheadline ? (
            <p className="mt-6 max-w-md text-base leading-relaxed text-taupe md:text-lg">
              {data.subheadline}
            </p>
          ) : null}
          {data.ctaButtons?.length ? (
            <div className="mt-9 flex flex-wrap gap-3">
              {data.ctaButtons.map((button) => (
                <CtaLink
                  key={button._key}
                  href={button.href}
                  label={button.label}
                  variant={button.variant}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
