import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { SanityImage as SanityImageType } from "@/lib/types";

type Props = {
  value?: SanityImageType;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function hasSanityImage(value?: SanityImageType) {
  return Boolean(value?.asset);
}

export function SanityImage({
  value,
  alt,
  width = 1200,
  height,
  fill = false,
  className,
  sizes,
  priority,
}: Props) {
  if (!value?.asset) return null;

  const resolvedAlt = alt || value.alt || "";
  const blurDataURL = value.asset.metadata?.lqip || undefined;
  const aspectRatio = value.asset.metadata?.dimensions?.aspectRatio;

  if (fill) {
    // With `fill`, CSS sizes the frame. Only crop on the CDN when the
    // caller passes an explicit height (so hotspot can align to that ratio).
    // Otherwise keep the source aspect and let object-fit handle framing.
    const builder = urlFor(value).width(width).auto("format");
    const src = height
      ? builder.height(height).fit("crop").url()
      : builder.url();

    return (
      <Image
        src={src}
        alt={resolvedAlt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
      />
    );
  }

  const resolvedHeight =
    height ??
    (aspectRatio
      ? Math.round(width / aspectRatio)
      : Math.round(width * 0.75));

  const src = urlFor(value)
    .width(width)
    .height(resolvedHeight)
    .fit("crop")
    .auto("format")
    .url();

  return (
    <Image
      src={src}
      alt={resolvedAlt}
      width={width}
      height={resolvedHeight}
      className={className}
      sizes={sizes}
      priority={priority}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
    />
  );
}
