import type { FooterConfig } from "@/lib/types";

type Props = {
  config?: FooterConfig;
};

export function Footer({ config }: Props) {
  if (!config) return null;

  return (
    <footer className="bg-graphite text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-8 md:py-20">
        <div>
          <p className="font-serif text-4xl tracking-[-0.03em]">
            {config.brandName || "Selena"}
          </p>
          {config.tagline ? (
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/60">
              {config.tagline}
            </p>
          ) : null}
        </div>

        <div className="space-y-3 text-sm text-ivory/70">
          <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-ivory/45">
            İletişim
          </p>
          {config.email ? (
            <a
              href={`mailto:${config.email}`}
              className="block transition hover:text-ivory"
            >
              {config.email}
            </a>
          ) : null}
          {config.phone ? (
            <a
              href={`tel:${config.phone.replace(/\s/g, "")}`}
              className="block transition hover:text-ivory"
            >
              {config.phone}
            </a>
          ) : null}
          {config.address ? <p>{config.address}</p> : null}
        </div>

        <div className="space-y-3 text-sm text-ivory/70">
          <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-ivory/45">
            Sosyal
          </p>
          {(config.socialLinks ?? []).map((link) => (
            <a
              key={link._key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition hover:text-ivory"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 text-xs text-ivory/40 md:px-8">
          <p>{config.copyright || `© ${new Date().getFullYear()} Selena`}</p>
          <a href="#ana-sayfa" className="transition hover:text-ivory/70">
            Yukarı
          </a>
        </div>
      </div>
    </footer>
  );
}
