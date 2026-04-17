/**
 * basePath constant matching next.config.ts basePath.
 * Used to prefix /public asset paths in JSX since Next.js
 * automatically adds basePath to <Image> components but NOT
 * to plain <img> tags or hardcoded src strings.
 */
export const BASE_PATH = "";

/**
 * Prefix a public asset path with the basePath.
 * Usage: img(src="/image/foo.png") → withBase("/image/foo.png")
 */
export function withBase(path: string): string {
  return `${BASE_PATH}${path}`;
}
