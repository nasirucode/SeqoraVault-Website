import type { StaticImageData } from 'next/image'

/** Normalize Next.js static imports (`StaticImageData`) to a URL string for `<img src>` / CSS `url()`. */
export function assetUrl(src: string | StaticImageData): string {
  return typeof src === 'string' ? src : src.src
}
