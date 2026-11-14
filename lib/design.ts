/**
 * The switchable design system.
 *
 * A project's look is one option per axis. Six axes are CSS-only: the root layout writes
 * `data-<axis>="<option>"` on <html> and `styles/design/<axis>.css` redefines semantic tokens
 * for that option. Two axes (`layout`, `nav`) are structural: they pick a component.
 *
 * The project's choice lives in `design.config.ts` at the root. This file holds the types,
 * the option lists, the presets and the resolution logic. It has no React and no Node APIs, so
 * the scripts, server components and the switcher can all import it.
 */

export const AXES = {
  shape: ["sharp", "soft", "round", "pill", "capsule"],
  buttons: ["offset", "solid", "outline", "glow", "brutal", "press"],
  surface: ["raised", "flat", "bordered", "glass", "paper"],
  type: ["geist", "editorial", "mono", "display", "friendly"],
  layout: ["split", "centered", "editorial", "bento", "marketplace"],
  nav: ["bar", "floating", "sidebar"],
  density: ["compact", "comfortable", "spacious"],
  accent: ["orange", "teal", "green", "yellow", "rose"],
} as const;

export type Axis = keyof typeof AXES;
export type AxisOption<A extends Axis> = (typeof AXES)[A][number];
export type Design = { [A in Axis]: AxisOption<A> };

export const AXIS_NAMES = Object.keys(AXES) as Axis[];

/** One line per axis, shown in the switcher and the styleguide. */
export const AXIS_LABELS: Record<Axis, string> = {
  shape: "Shape",
  buttons: "Buttons",
  surface: "Surface",
  type: "Type",
  layout: "Layout",
  nav: "Navigation",
  density: "Density",
  accent: "Accent",
};

export const PRESETS = {
  summit: {
    shape: "round",
    buttons: "offset",
    surface: "raised",
    type: "geist",
    layout: "split",
    nav: "bar",
    density: "comfortable",
    accent: "orange",
  },
  brutalist: {
    shape: "sharp",
    buttons: "brutal",
    surface: "bordered",
    type: "display",
    layout: "centered",
    nav: "bar",
    density: "compact",
    accent: "yellow",
  },
  soft: {
    shape: "pill",
    buttons: "solid",
    surface: "glass",
    type: "geist",
    layout: "centered",
    nav: "floating",
    density: "spacious",
    accent: "teal",
  },
  editorial: {
    shape: "soft",
    buttons: "outline",
    surface: "flat",
    type: "editorial",
    layout: "editorial",
    nav: "bar",
    density: "spacious",
    accent: "orange",
  },
  terminal: {
    shape: "sharp",
    buttons: "glow",
    surface: "bordered",
    type: "mono",
    layout: "split",
    nav: "sidebar",
    density: "compact",
    accent: "green",
  },
  bento: {
    shape: "round",
    buttons: "solid",
    surface: "flat",
    type: "display",
    layout: "bento",
    nav: "floating",
    density: "comfortable",
    accent: "teal",
  },
  marketplace: {
    shape: "capsule",
    buttons: "press",
    surface: "paper",
    type: "friendly",
    layout: "marketplace",
    nav: "bar",
    density: "comfortable",
    accent: "rose",
  },
} as const satisfies Record<string, Design>;

export type PresetName = keyof typeof PRESETS;
export const PRESET_NAMES = Object.keys(PRESETS) as PresetName[];
export const DEFAULT_PRESET: PresetName = "summit";

/** What `design.config.ts` may hold: a preset, plus any axis overrides on top of it. */
export type DesignConfig = { preset?: PresetName } & Partial<Design>;

/** Name of the cookie the design switcher writes. */
export const DESIGN_COOKIE = "design";

export function isAxisOption<A extends Axis>(
  axis: A,
  value: unknown,
): value is AxisOption<A> {
  return (
    typeof value === "string" &&
    (AXES[axis] as readonly string[]).includes(value)
  );
}

export function isPresetName(value: unknown): value is PresetName {
  return typeof value === "string" && value in PRESETS;
}

/** A full design from a config: the preset's values, then any valid overrides. */
export function resolveDesign(config: DesignConfig = {}): Design {
  const base: Design = {
    ...PRESETS[isPresetName(config.preset) ? config.preset : DEFAULT_PRESET],
  };
  for (const axis of AXIS_NAMES) {
    const value = config[axis];
    if (isAxisOption(axis, value)) {
      (base as Record<Axis, string>)[axis] = value;
    }
  }
  return base;
}

/** The preset a design matches exactly, if any. */
export function matchPreset(design: Design): PresetName | undefined {
  return PRESET_NAMES.find((name) =>
    AXIS_NAMES.every((axis) => PRESETS[name][axis] === design[axis]),
  );
}

/** `data-shape="round"` etc. for <html>. */
export function designAttributes(design: Design): Record<string, string> {
  const attributes: Record<string, string> = {};
  for (const axis of AXIS_NAMES) attributes[`data-${axis}`] = design[axis];
  return attributes;
}

/** A random option per axis. `random` is injectable so scripts can seed it. */
export function shuffleDesign(random: () => number = Math.random): Design {
  const design = {} as Record<Axis, string>;
  for (const axis of AXIS_NAMES) {
    const options = AXES[axis];
    design[axis] = options[Math.floor(random() * options.length)];
  }
  return design as Design;
}

/** Parse the switcher cookie. Anything invalid is ignored, so a bad cookie cannot break a page. */
export function parseDesignCookie(
  raw: string | undefined,
): Partial<Design> | undefined {
  if (!raw) return undefined;
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw));
    if (!parsed || typeof parsed !== "object") return undefined;
    const result: Partial<Record<Axis, string>> = {};
    for (const axis of AXIS_NAMES) {
      const value = (parsed as Record<string, unknown>)[axis];
      if (isAxisOption(axis, value)) result[axis] = value;
    }
    return result as Partial<Design>;
  } catch {
    return undefined;
  }
}

export function serializeDesignCookie(design: Design): string {
  return encodeURIComponent(JSON.stringify(design));
}

/** A ready-to-paste `design.config.ts`. Used by the switcher's "Copy config" and the wizard. */
export function designConfigSource(design: Design): string {
  const preset = matchPreset(design);
  const lines = AXIS_NAMES.map((axis) => `  ${axis}: "${design[axis]}",`).join(
    "\n",
  );
  return `import type { DesignConfig } from "@/lib/design";

/**
 * This project's look: one option per axis. ${preset ? `Matches the "${preset}" preset.` : "A custom mix."}
 * Options are listed in lib/design.ts (AXES). Preview combinations with the design switcher
 * (bottom-right corner in development), then paste its "Copy config" output here.
 */
const design: DesignConfig = {
${preset ? `  preset: "${preset}",\n` : ""}${lines}
};

export default design;
`;
}

/**
 * The inline script that applies the switcher cookie to <html> before first paint.
 * It only ships when the switcher is enabled. It validates every value against AXES.
 */
export function designCookieScript(): string {
  return `(function(){try{var m=document.cookie.match(/(?:^|; )${DESIGN_COOKIE}=([^;]*)/);if(!m)return;var d=JSON.parse(decodeURIComponent(m[1]));var a=${JSON.stringify(AXES)};var h=document.documentElement;for(var k in a){if(d&&a[k].indexOf(d[k])>-1)h.setAttribute("data-"+k,d[k])}}catch(e){}})()`;
}
