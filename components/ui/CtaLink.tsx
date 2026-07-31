import { stegaClean } from "next-sanity";

type Props = {
  href: string;
  label: string;
  variant?: string | null;
  className?: string;
};

export function CtaLink({ href, label, variant = "primary", className }: Props) {
  const cleanVariant = stegaClean(variant) || "primary";
  const isPrimary = cleanVariant === "primary";

  return (
    <a
      href={href}
      className={[
        "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition duration-300",
        isPrimary
          ? "bg-cocoa text-ivory hover:bg-graphite"
          : "border border-cocoa/20 bg-transparent text-cocoa hover:border-cocoa/40 hover:bg-cocoa/5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </a>
  );
}
