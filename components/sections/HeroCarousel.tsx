"use client";

import { useEffect, useState } from "react";

import { SanityImage } from "@/components/ui/SanityImage";
import type { HeroSection } from "@/lib/types";

type Props = {
  slides: NonNullable<HeroSection["slides"]>;
};

const INTERVAL_MS = 5000;

export function HeroCarousel({ slides }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <div className="absolute inset-0">
      {slides.map((slide, index) => {
        const isActive = index === active;
        return (
          <div
            key={slide._key}
            className={[
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              isActive ? "opacity-100" : "opacity-0",
            ].join(" ")}
            aria-hidden={!isActive}
          >
            <SanityImage
              value={slide.image}
              fill
              width={2000}
              height={1400}
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              alt={slide.title || "Hero slide"}
            />
          </div>
        );
      })}

      {slides.length > 1 ? (
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 md:bottom-10">
          {slides.map((slide, index) => (
            <button
              key={slide._key}
              type="button"
              aria-label={`Slide ${index + 1}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
              className={[
                "h-[2px] rounded-full transition-all duration-500",
                index === active
                  ? "w-10 bg-ivory"
                  : "w-5 bg-ivory/40 hover:bg-ivory/70",
              ].join(" ")}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
