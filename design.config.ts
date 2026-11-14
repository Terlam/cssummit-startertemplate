import type { DesignConfig } from "@/lib/design";

/**
 * This project's look: one option per axis. Matches the "marketplace" preset.
 * Options are listed in lib/design.ts (AXES). Preview combinations with the design switcher
 * (bottom-right corner in development), then paste its "Copy config" output here.
 */
const design: DesignConfig = {
  preset: "marketplace",
  shape: "capsule",
  buttons: "press",
  surface: "paper",
  type: "friendly",
  layout: "marketplace",
  nav: "bar",
  density: "comfortable",
  accent: "rose",
};

export default design;
