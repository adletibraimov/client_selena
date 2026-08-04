"use client";

import { useEffect, useRef, useState } from "react";
import { hasSanityImage, SanityImage } from "@/components/ui/SanityImage";
import type { TestimonialsSection } from "@/lib/types";

type Item = NonNullable<TestimonialsSection["testimonials"]>[number];

type Props = {
  items: NonNullable<TestimonialsSection["testimonials"]>;
};

function TestimonialCard({ item }: { item: Item }) {
  return (
    <figure className="w-[min(85vw,360px)] shrink-0 rounded-[1.75rem] border border-cocoa/8 bg-white/50 px-7 py-8 md:w-[400px]">
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
          {item.role ? <p className="text-xs text-taupe">{item.role}</p> : null}
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialsMarquee({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const measure = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const count = items.length;
      if (!count || cards.length < count) {
        setShouldScroll(false);
        return;
      }

      const styles = getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
      let contentWidth = 0;
      for (let i = 0; i < count; i++) {
        contentWidth += cards[i].offsetWidth;
      }
      contentWidth += gap * Math.max(0, count - 1);

      setShouldScroll(contentWidth > container.clientWidth + 1);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(track);

    return () => observer.disconnect();
  }, [items]);

  const loop = shouldScroll ? [...items, ...items] : items;

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {shouldScroll ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ivory to-transparent md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ivory to-transparent md:w-28" />
        </>
      ) : null}

      <div
        ref={trackRef}
        className={
          shouldScroll
            ? "flex w-max animate-marquee gap-5 hover:[animation-play-state:paused] md:gap-7"
            : "flex justify-center gap-5 px-5 md:gap-7 md:px-8"
        }
      >
        {loop.map((item, index) => (
          <TestimonialCard key={`${item._key}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}
