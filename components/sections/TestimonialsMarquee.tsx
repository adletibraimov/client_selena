"use client";

import { hasSanityImage, SanityImage } from "@/components/ui/SanityImage";
import type { TestimonialsSection } from "@/lib/types";

type Props = {
  items: NonNullable<TestimonialsSection["testimonials"]>;
};

export function TestimonialsMarquee({ items }: Props) {
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ivory to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ivory to-transparent md:w-28" />

      <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused] md:gap-7">
        {loop.map((item, index) => (
          <figure
            key={`${item._key}-${index}`}
            className="w-[min(85vw,360px)] shrink-0 rounded-[1.75rem] border border-cocoa/8 bg-white/50 px-7 py-8 md:w-[400px]"
          >
            <blockquote className="font-serif text-xl leading-relaxed tracking-[-0.02em] text-cocoa md:text-2xl">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3">
              {hasSanityImage(item.image) ? (
                <div className="relative h-11 w-11 overflow-hidden rounded-full">
                  <SanityImage
                    value={item.image}
                    fill
                    width={88}
                    height={88}
                    className="object-cover"
                    sizes="44px"
                    alt={item.name}
                  />
                </div>
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cocoa/5 font-serif text-sm text-cocoa">
                  {item.name.slice(0, 1)}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-cocoa">{item.name}</p>
                {item.role ? (
                  <p className="text-xs text-taupe">{item.role}</p>
                ) : null}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
