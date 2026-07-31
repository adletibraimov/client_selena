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

  const resolvedHeight = height ?? Math.round(width * 1.25);
  const resolvedAlt = alt || value.alt || "";
  const src = urlFor(value)
    .width(width)
    .height(resolvedHeight)
    .fit("crop")
    .auto("format")
    .url();
  const blurDataURL = value.asset.metadata?.lqip || undefined;

  if (fill) {
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
