import {
  AccessibilityIcon,
  BlocksIcon,
  PaletteIcon,
  RocketIcon,
  ShieldCheckIcon,
  TerminalSquareIcon,
} from "lucide-react";
import { Container, Section } from "@/components/container";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const features = [
  {
    icon: BlocksIcon,
    title: "Only the pieces you need",
    text: "Seven kits sit outside the app until you add one. A game team never carries a database.",
  },
  {
    icon: PaletteIcon,
    title: "Nobody's demo looks the same",
    text: "Flip shape, buttons, type, layout and colour live, or hit Shuffle. Every component follows.",
  },
  {
    icon: TerminalSquareIcon,
    title: "Claude Code ready",
    text: "Project rules and skills are included, so Claude builds in the template's style from the first prompt.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Your accounts, your keys",
    text: "Supabase and Vercel are yours. Nothing points at the organisers, and secrets stay in .env.local.",
  },
  {
    icon: AccessibilityIcon,
    title: "Accessible by default",
    text: "Contrast-checked colours, visible focus rings and keyboard-friendly components out of the box.",
  },
  {
    icon: RocketIcon,
    title: "Ships in one command",
    text: "Builds with zero env vars, so you can deploy to your own Vercel before you write a line.",
  },
];

/** Six feature cards; the grid changes character with the `layout` axis. */
export function Features() {
  return (
    <Section id="features" className="layout-marketplace:border-t">
      <Container className="flex flex-col gap-12 layout-marketplace:lg:grid layout-marketplace:lg:grid-cols-[1fr_2fr]">
        <SectionHeading
          eyebrow="Why this starter"
          title="Less setup, more demo."
        >
          Everything a hackathon team burns the first three hours on is done.
        </SectionHeading>
        <ul
          className={cn(
            "grid gap-stack sm:grid-cols-2 lg:grid-cols-3",
            "layout-editorial:gap-0 layout-editorial:sm:grid-cols-1 layout-editorial:lg:grid-cols-2 layout-editorial:lg:gap-x-12",
            "layout-bento:lg:grid-cols-4",
            "layout-marketplace:gap-x-10 layout-marketplace:gap-y-7 layout-marketplace:lg:grid-cols-2",
          )}
        >
          {features.map((feature, i) => (
            <li
              key={feature.title}
              className={cn(
                "surface flex flex-col gap-4 rounded-card p-card",
                "layout-centered:items-center layout-centered:text-center",
                "layout-marketplace:grid layout-marketplace:grid-cols-[1.75rem_1fr] layout-marketplace:gap-x-4 layout-marketplace:gap-y-1 layout-marketplace:border-0 layout-marketplace:bg-transparent layout-marketplace:p-0 layout-marketplace:shadow-none",
                "layout-editorial:grid layout-editorial:grid-cols-[2.5rem_1fr] layout-editorial:gap-x-4 layout-editorial:gap-y-1 layout-editorial:rounded-none layout-editorial:border-0 layout-editorial:border-b layout-editorial:bg-transparent layout-editorial:px-0 layout-editorial:py-6 layout-editorial:shadow-none layout-editorial:backdrop-blur-none",
                i === 0 &&
                  "layout-bento:bg-primary layout-bento:text-primary-foreground layout-bento:lg:col-span-2 layout-bento:lg:row-span-2 layout-bento:lg:justify-end",
                i >= 3 && "layout-bento:lg:col-span-2",
              )}
            >
              <span className="flex size-11 items-center justify-center rounded-control bg-primary-tint text-primary-text layout-editorial:row-span-2 layout-editorial:size-auto layout-editorial:bg-transparent layout-editorial:font-mono layout-editorial:text-sm layout-marketplace:row-span-2 layout-marketplace:size-auto layout-marketplace:items-start layout-marketplace:bg-transparent layout-marketplace:pt-0.5 layout-marketplace:text-foreground">
                <feature.icon
                  className={cn(
                    "size-5 layout-editorial:hidden",
                    i === 0 && "layout-bento:text-primary-foreground",
                  )}
                  aria-hidden
                />
                <span className="hidden layout-editorial:inline">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <h3
                className={cn(
                  "text-xl layout-marketplace:font-sans layout-marketplace:text-base layout-marketplace:font-bold layout-marketplace:tracking-normal",
                  i === 0 && "layout-bento:lg:text-4xl",
                )}
              >
                {feature.title}
              </h3>
              <p
                className={cn(
                  "text-muted-foreground layout-editorial:col-start-2 layout-marketplace:col-start-2 layout-marketplace:text-[0.9375rem]",
                  i === 0 && "layout-bento:text-primary-foreground",
                )}
              >
                {feature.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
