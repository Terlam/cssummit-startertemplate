/**
 * Brand colours as plain hex, for the few places CSS variables cannot reach: the generated
 * Open Graph image and the browser theme-color. Everywhere else, use the semantic tokens
 * (bg-background, text-primary ...) from app/globals.css. Keep these in sync with the
 * `--brand-*` block there.
 */
export const brandHex = {
  paper: "#0b0c0e",
  card: "#191c21",
  ink: "#f3f1ec",
  muted: "#a9b1ba",
  orange: "#e08c47",
  teal: "#7ecac6",
  green: "#3fbf8c",
  yellow: "#f2c272",
  onFill: "#101820",
  edge: "#3f464f",
  paperGround: "#ffffff",
} as const;
