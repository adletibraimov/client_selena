"use client";

import { useEffect, useState } from "react";

import type { HeaderConfig } from "@/lib/types";
import { SanityImage } from "@/components/ui/SanityImage";
import { MobileNav } from "@/components/layout/MobileNav";

type Props = {
  config?: HeaderConfig;
};

export function Header({ config }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const navItems = config?.navItems ?? [];
  const brandName = config?.brandName || "Selena";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems
      .map((item) => item.href.replace("#", ""))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 transition duration-500",
        scrolled ? "py-3" : "py-5",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a
          href="#ana-sayfa"
          className={[
            "flex items-center gap-3 rounded-full px-4 py-2 transition duration-500",
            scrolled
              ? "bg-ivory/90 shadow-[0_10px_40px_rgba(44,40,37,0.08)] backdrop-blur-md"
              : "bg-transparent",
          ].join(" ")}
        >
          {config?.logo?.asset ? (
            <SanityImage
              value={config.logo}
              alt={brandName}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : null}
          <span className="font-serif text-2xl tracking-[-0.03em] text-cocoa">
            {brandName}
          </span>
        </a>

        <nav
          className={[
            "hidden items-center gap-1 rounded-full px-2 py-1.5 transition duration-500 lg:flex",
            scrolled
              ? "bg-ivory/90 shadow-[0_10px_40px_rgba(44,40,37,0.08)] backdrop-blur-md"
              : "bg-ivory/70 backdrop-blur-sm",
          ].join(" ")}
          aria-label="Ana menü"
        >
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item._key}
                href={item.href}
                className={[
                  "rounded-full px-4 py-2 text-[13px] font-medium transition duration-300",
                  isActive
                    ? "bg-graphite text-ivory"
                    : "text-cocoa/80 hover:bg-cocoa/5 hover:text-cocoa",
                ].join(" ")}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <MobileNav
          brandName={brandName}
          navItems={navItems}
          activeHref={active}
        />
      </div>
    </header>
  );
}
