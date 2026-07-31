type Props = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: Props) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";
  const eyebrowColor =
    tone === "dark" ? "text-ivory/55" : "text-taupe tracking-[0.22em]";
  const titleColor = tone === "dark" ? "text-ivory" : "text-cocoa";
  const descColor = tone === "dark" ? "text-ivory/65" : "text-taupe";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow ? (
        <p
          className={`mb-4 text-[11px] font-medium uppercase ${eyebrowColor}`}
        >
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h2
          className={`font-serif text-4xl leading-[1.1] tracking-[-0.02em] md:text-5xl ${titleColor}`}
        >
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${descColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
