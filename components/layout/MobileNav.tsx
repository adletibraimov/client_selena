"use client";

import { useEffect, useState } from "react";

import type { NavItem } from "@/lib/types";

type Props = {
  brandName: string;
  navItems: NavItem[];
  activeHref?: string;
};

export function MobileNav({ brandName, navItems, activeHref }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory/90 text-cocoa shadow-[0_10px_30px_rgba(44,40,37,0.1)] backdrop-blur-md"
      >
        <span className="sr-only">Menu</span>
        <span className="relative block h-3.5 w-5">
          <span
            className={[
              "absolute left-0 h-[1.5px] w-full bg-cocoa transition",
              open ? "top-1.5 rotate-45" : "top-0",
            ].join(" ")}
          />
          <span
            className={[
              "absolute left-0 top-1.5 h-[1.5px] w-full bg-cocoa transition",
              open ? "opacity-0" : "opacity-100",
            ].join(" ")}
          />
          <span
            className={[
              "absolute left-0 h-[1.5px] w-full bg-cocoa transition",
              open ? "top-1.5 -rotate-45" : "top-3",
            ].join(" ")}
          />
        </span>
      </button>

      <div
        id="mobile-drawer"
        className={[
          "fixed inset-0 z-50 bg-ivory transition duration-500",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-6">
          <div className="mb-12 flex items-center justify-between">
            <span className="font-serif text-3xl text-cocoa">{brandName}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-cocoa/15 px-4 py-2 text-sm text-cocoa"
            >
              Kapat
            </button>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Mobil menü">
            {navItems.map((item, index) => {
              const isActive = activeHref === item.href;
              return (
                <a
                  key={item._key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "animate-fade-up border-b border-cocoa/10 py-5 font-serif text-3xl transition",
                    isActive ? "text-cocoa" : "text-cocoa/55",
                  ].join(" ")}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
