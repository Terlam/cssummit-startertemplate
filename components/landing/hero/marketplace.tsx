"use client";

import {
  CheckIcon,
  CopyIcon,
  HeartIcon,
  LayoutGridIcon,
  SearchIcon,
} from "lucide-react";
import { type FormEvent, useId, useState } from "react";
import { Container } from "@/components/container";
import { PRESET_NAMES } from "@/lib/design";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { hero, kitCatalog } from "../content";
import { HeroLede, HeroTitle } from "./parts";

// Tile tints cycle through the chart palette, so they follow the accent axis.
const tints = [
  "bg-[color-mix(in_oklab,var(--chart-1)_16%,var(--card))]",
  "bg-[color-mix(in_oklab,var(--chart-2)_18%,var(--card))]",
  "bg-[color-mix(in_oklab,var(--chart-3)_18%,var(--card))]",
  "bg-[color-mix(in_oklab,var(--chart-4)_20%,var(--card))]",
  "bg-[color-mix(in_oklab,var(--chart-5)_18%,var(--card))]",
];

/** Quotes a project name for the shell, so the command copies and runs as shown. */
function shellQuote(value: string) {
  return `"${value.replace(/["\\$`]/g, "\\$&")}"`;
}

/**
 * layout="marketplace": a centred hero with a pill-shaped "search" that builds the
 * `pnpm start-project` command, then a category row and the kits as listing cards.
 * The heart on a card picks that kit in the search bar.
 */
export function HeroMarketplace() {
  const id = useId();
  const [name, setName] = useState("");
  const [kit, setKit] = useState("");
  const [design, setDesign] = useState("marketplace");
  const [category, setCategory] = useState("all");
  const [command, setCommand] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const shown = kitCatalog.filter(
    (item) => category === "all" || item.name === category,
  );
  const current = kitCatalog.find((item) => item.name === category);

  function build(event: FormEvent) {
    event.preventDefault();
    const parts = ["pnpm start-project"];
    if (name.trim()) parts.push(`--name ${shellQuote(name.trim())}`);
    parts.push(`--kits ${kit || "none"}`, `--design ${design}`, "--yes");
    setCommand(parts.join(" "));
    setCopied(false);
  }

  async function copy() {
    if (!command) return;
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <section id="start" className="scroll-mt-24 py-section">
        <Container className="flex flex-col items-center gap-7 text-center">
          <p className="text-sm font-semibold text-muted-foreground">
            {site.name} · {site.org}
          </p>
          <HeroTitle className="max-w-3xl text-[clamp(2.25rem,6vw,3.75rem)]" />
          <HeroLede className="mx-auto" />

          <form
            onSubmit={build}
            className="flex w-full max-w-4xl flex-col gap-1 rounded-card border bg-card p-2 text-left shadow-[var(--surface-shadow)] sm:flex-row sm:items-center sm:rounded-control"
          >
            <label
              htmlFor={`${id}-name`}
              className="flex min-w-0 flex-1 flex-col gap-0.5 rounded-control px-6 py-2.5 hover:bg-muted"
            >
              <span className="text-xs font-bold">Project</span>
              <input
                id={`${id}-name`}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name your project"
                className="w-full bg-transparent text-sm outline-offset-4 placeholder:text-muted-foreground"
              />
            </label>
            <span aria-hidden className="hidden h-8 w-px bg-border sm:block" />
            <label
              htmlFor={`${id}-kit`}
              className="flex min-w-0 flex-1 flex-col gap-0.5 rounded-control px-6 py-2.5 hover:bg-muted"
            >
              <span className="text-xs font-bold">Kit</span>
              <select
                id={`${id}-kit`}
                value={kit}
                onChange={(event) => setKit(event.target.value)}
                className="w-full bg-transparent text-sm outline-offset-4"
              >
                <option value="">No kit yet</option>
                {kitCatalog.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
            <span aria-hidden className="hidden h-8 w-px bg-border sm:block" />
            <label
              htmlFor={`${id}-design`}
              className="flex min-w-0 flex-1 flex-col gap-0.5 rounded-control px-6 py-2.5 hover:bg-muted"
            >
              <span className="text-xs font-bold">Design</span>
              <select
                id={`${id}-design`}
                value={design}
                onChange={(event) => setDesign(event.target.value)}
                className="w-full bg-transparent text-sm outline-offset-4"
              >
                {PRESET_NAMES.map((preset) => (
                  <option key={preset} value={preset}>
                    {preset}
                  </option>
                ))}
                <option value="shuffle">shuffle</option>
              </select>
            </label>
            <button
              type="submit"
              className="btn btn-primary inline-flex h-control-lg shrink-0 items-center justify-center gap-2 rounded-control px-6 text-base focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <SearchIcon className="size-4" aria-hidden />
              {hero.primary.label}
            </button>
          </form>

          <div aria-live="polite" className="w-full max-w-4xl">
            {command ? (
              <div className="flex flex-col items-start gap-3 rounded-card bg-muted p-4 text-left sm:flex-row sm:items-center">
                <code className="min-w-0 flex-1 font-mono text-sm break-all">
                  {command}
                </code>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex h-control-sm shrink-0 items-center gap-2 rounded-control border bg-card px-3 text-sm font-semibold hover:bg-background"
                >
                  {copied ? (
                    <CheckIcon className="size-4" aria-hidden />
                  ) : (
                    <CopyIcon className="size-4" aria-hidden />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <section id="kits" aria-label="Kits" className="scroll-mt-24">
        <div className="border-b">
          <Container>
            <div className="flex gap-9 overflow-x-auto pt-2 lg:justify-center">
              {[{ name: "all", title: "All kits", icon: LayoutGridIcon }]
                .concat(kitCatalog)
                .map((item) => {
                  const on = item.name === category;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setCategory(item.name)}
                      className={cn(
                        "flex min-w-14 shrink-0 flex-col items-center gap-2 border-b-2 px-0.5 pt-3.5 pb-3 text-[0.8125rem] font-semibold transition-colors",
                        on
                          ? "border-foreground text-foreground"
                          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                      )}
                    >
                      <item.icon
                        className="size-6"
                        strokeWidth={1.6}
                        aria-hidden
                      />
                      {item.title}
                    </button>
                  );
                })}
            </div>
          </Container>
        </div>

        <Container className="flex flex-col gap-6 py-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-2xl">
              {current
                ? `The ${current.title.toLowerCase()} kit`
                : "Pick a kit. One, two at most."}
            </h2>
            <p className="text-sm text-muted-foreground">
              Kits sit outside your app until you run{" "}
              <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                pnpm kit add
              </code>
            </p>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-x-6 gap-y-10">
            {shown.map((item) => {
              const picked = kit === item.name;
              const index = kitCatalog.indexOf(item);
              return (
                <li key={item.name} className="flex flex-col gap-3">
                  <div
                    className={cn(
                      "relative flex aspect-[1/0.95] items-center justify-center rounded-card text-foreground",
                      tints[index % tints.length],
                    )}
                  >
                    <item.icon
                      className="size-20"
                      strokeWidth={1.1}
                      aria-hidden
                    />
                    {item.account ? null : (
                      <span className="absolute top-3.5 left-3.5 rounded-badge bg-card px-3 py-1.5 text-[0.8125rem] font-bold shadow-sm">
                        No account needed
                      </span>
                    )}
                    <button
                      type="button"
                      aria-pressed={picked}
                      aria-label={`Pick the ${item.title} kit`}
                      onClick={() => setKit(picked ? "" : item.name)}
                      className="absolute top-1.5 right-1.5 flex size-11 items-center justify-center rounded-avatar"
                    >
                      <HeartIcon
                        className={cn(
                          "size-6 stroke-card drop-shadow",
                          picked ? "fill-primary" : "fill-foreground/45",
                        )}
                        strokeWidth={2}
                        aria-hidden
                      />
                    </button>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex justify-between gap-2">
                      <h3 className="font-sans text-base font-bold tracking-normal">
                        {item.title} kit
                      </h3>
                      <span className="font-mono text-[0.8125rem] text-muted-foreground">
                        {item.name}
                      </span>
                    </div>
                    <p className="text-[0.9375rem] text-muted-foreground">
                      {item.blurb}
                    </p>
                    <p className="text-[0.9375rem] text-muted-foreground">
                      {item.pages.join(" · ")}
                    </p>
                    <p className="mt-1 text-[0.9375rem] font-bold">
                      {item.account ?? "No account needed"}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
