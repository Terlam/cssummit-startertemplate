---
name: design
description: Change how the project looks - switch to a design preset, change one design axis (shape, buttons, surface, type, layout, nav, density, accent), or invent a new option or preset that follows the axis contract. Use for requests like "make it brutalist", "pill buttons", "serif headings", "make it look different", or "invent a new preset".
argument-hint: "[preset | axis=value | idea]"
---

# Change the design

The look is one value per axis, kept in `design.config.ts`. Read `lib/design.ts` first: it holds the axis names, the allowed options and the presets. Do not trust the lists below over that file.

| Axis | Options (at time of writing) | Kind |
|---|---|---|
| `shape` | sharp, soft, round, pill, capsule | CSS (`styles/design/shape.css`) |
| `buttons` | offset, solid, outline, glow, brutal, press | CSS |
| `surface` | raised, flat, bordered, glass, paper | CSS |
| `type` | geist, editorial, mono, display, friendly | CSS |
| `density` | compact, comfortable, spacious | CSS |
| `accent` | orange, teal, green, yellow, rose | CSS |
| `layout` | split, centered, editorial, bento, marketplace | Component (`components/landing/hero/`) |
| `nav` | bar, floating, sidebar | Component (`components/nav/`) |

Presets: summit, brutalist, soft, editorial, terminal, bento, marketplace.

Pick the smallest change that does what the learner asked.

`design.config.ts` is a `DesignConfig`: an optional `preset` plus any axis values. Axis values override the preset (`resolveDesign()` in `lib/design.ts`). The switcher's "Copy config" and the wizard write the preset (when the design matches one) and all eight axes.

```ts
import type { DesignConfig } from "@/lib/design";

const design: DesignConfig = {
  preset: "soft",
  accent: "orange", // overrides the preset's teal
};

export default design;
```

## 1. Switch preset

Replace the file's contents with `preset: "<name>"` and no axis values (the axis lines left in the file would override the new preset). Tell the learner they can also try presets live with the **Design** button (bottom-right in `pnpm dev`) and press "Copy config".

## 2. Change one axis

Set or edit that one axis value in `design.config.ts`; it overrides the preset. Use only options listed in `lib/design.ts`. If the request matches no option, say which existing option is closest, or offer to invent one (section 3).

## 3. Invent a new option

**CSS axis** (`shape`, `buttons`, `surface`, `type`, `density`, `accent`):

1. Open `styles/design/<axis>.css` and copy an existing block. Each block is keyed on the attribute, for example `[data-buttons="brutal"] { ... }`.
2. Add a new block `[data-<axis>="<new-value>"] { ... }` that redefines the **same semantic tokens** the other blocks set. Do not add new token names unless every option defines them; do not target component class names.
3. For `accent`, set every token the other accent blocks set: `--primary`, `--primary-foreground` (text on the primary fill; check contrast, aim for 4.5:1), `--primary-text`, `--primary-tint`, `--primary-shadow`, and `--chart-1` … `--chart-5` (chart-1 is the accent, the other four distinct colours).
4. Add `"<new-value>"` to that axis's option list in `lib/design.ts`, so types, the switcher and Shuffle pick it up.

**Structural axis** (`layout`, `nav`):

1. Copy the closest variant in `components/landing/hero/` or `components/nav/` to a new file.
2. Register it in the lookup that maps the config value to the component (`components/landing/hero.tsx` or `components/site-header.tsx`), and add the value to `lib/design.ts`.
3. Add the matching "hide the inactive variants" rule in `styles/design/layout.css` or `styles/design/nav.css`, and a `@custom-variant layout-<value>` / `nav-<value>` line in `app/globals.css` next to the existing ones.
4. Use semantic tokens only (`bg-background`, `bg-card`, `text-muted-foreground`, `border-border`, ...).

## 4. Invent a new preset

Add an entry to the presets in `lib/design.ts` with one value for every axis, then set `design.config.ts` to it. Give it a short lowercase name.

## Rules

- Never hardcode colours, radii or fonts in components. Change tokens or axis files instead.
- Keep it dark unless the learner asks for light: `paper` is the only light surface, and a new light option must also set the paper text colours in `accent.css`.
- Fonts come from `next/font`; a new font family needs wiring in the root layout. Mention this before doing it.

## Check

1. `pnpm verify` passes.
2. Open `/styleguide` and the home page in the browser, at desktop and ~375px. Look for unreadable text, overflow and broken focus rings.
3. Tell the learner what changed, and that the switcher panel can still preview other options.
