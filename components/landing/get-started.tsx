import { BlocksIcon, PaletteIcon, TerminalSquareIcon } from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import { Container, Section } from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PRESET_NAMES } from "@/lib/design";
import { kitCatalog } from "./content";
import { SectionHeading } from "./section-heading";

const steps = [
  { command: "pnpm install", note: "Install everything (once)." },
  {
    command: "pnpm start-project",
    note: "Name it, pick a kit or two, pick a look.",
  },
  { command: "pnpm dev", note: "Open http://localhost:3000." },
  { command: "claude", note: "Start Claude Code and type /start." },
];

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  );
}

export function GetStarted() {
  return (
    <Section id="get-started" className="scroll-mt-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Get started"
          title="Four commands to a running app."
        >
          Run these in the project folder. The wizard can be re-run any time.
        </SectionHeading>

        <div className="contents layout-marketplace:grid layout-marketplace:items-start layout-marketplace:gap-12 layout-marketplace:lg:grid-cols-[1fr_24rem]">
          <ol className="grid gap-stack sm:grid-cols-2 xl:grid-cols-4 layout-marketplace:flex layout-marketplace:flex-col layout-marketplace:gap-0">
            {steps.map((step, i) => (
              <li
                key={step.command}
                className="surface flex flex-col gap-3 rounded-card p-card layout-marketplace:grid layout-marketplace:grid-cols-[2.5rem_1fr] layout-marketplace:items-center layout-marketplace:gap-x-5 layout-marketplace:gap-y-1 layout-marketplace:rounded-none layout-marketplace:border-0 layout-marketplace:border-b layout-marketplace:bg-transparent layout-marketplace:px-0 layout-marketplace:py-5 layout-marketplace:shadow-none"
              >
                <span className="font-mono text-xs text-primary-text layout-marketplace:row-span-2 layout-marketplace:flex layout-marketplace:size-10 layout-marketplace:items-center layout-marketplace:justify-center layout-marketplace:rounded-avatar layout-marketplace:border layout-marketplace:font-sans layout-marketplace:text-[0.9375rem] layout-marketplace:font-bold layout-marketplace:text-foreground">
                  <span className="layout-marketplace:sr-only">Step </span>
                  {i + 1}
                </span>
                <code className="font-mono text-base font-semibold break-words">
                  {step.command}
                </code>
                <p className="text-sm text-muted-foreground layout-marketplace:col-start-2 layout-marketplace:text-[0.9375rem]">
                  {step.note}
                </p>
              </li>
            ))}
          </ol>

          {/* Only the marketplace layout shows this booking-style card next to the steps. */}
          <aside
            aria-label="Ready to build"
            className="surface hidden flex-col gap-4 rounded-card p-6 layout-marketplace:flex"
          >
            <h3 className="font-sans text-xl font-bold tracking-normal">
              Ready to build?
            </h3>
            <dl className="grid grid-cols-2 overflow-hidden rounded-field border border-input">
              <div className="border-r border-input px-3.5 py-3">
                <dt className="text-[0.6875rem] font-extrabold uppercase">
                  Wizard
                </dt>
                <dd className="font-mono text-sm text-muted-foreground">
                  pnpm start-project
                </dd>
              </div>
              <div className="px-3.5 py-3">
                <dt className="text-[0.6875rem] font-extrabold uppercase">
                  Claude Code
                </dt>
                <dd className="font-mono text-sm text-muted-foreground">
                  /start
                </dd>
              </div>
            </dl>
            <Button asChild size="lg">
              <Link href="/#start">Start a project</Link>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Pick a kit with the heart on its card, then copy the command.
            </p>
          </aside>
        </div>

        <div className="grid gap-stack lg:grid-cols-3">
          <Card>
            <CardHeader>
              <BlocksIcon
                className="mb-2 size-6 text-primary-text"
                aria-hidden
              />
              <CardTitle>Add a kit</CardTitle>
              <CardDescription>
                Kits live in <Code>kits/</Code> and are not part of the app
                until you add one. One or two is plenty.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <pre className="overflow-x-auto rounded-field bg-muted p-3 font-mono text-sm">
                pnpm kit list{"\n"}pnpm kit add map
              </pre>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                {kitCatalog.map((kit) => (
                  <li key={kit.name} className="flex items-center gap-2">
                    <kit.icon
                      className="size-4 shrink-0 text-primary-text"
                      aria-hidden
                    />
                    <span className="font-mono">{kit.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <PaletteIcon
                className="mb-2 size-6 text-primary-text"
                aria-hidden
              />
              <CardTitle>Change the look</CardTitle>
              <CardDescription>
                In development, the <strong>Design</strong> button (bottom
                right) flips every axis live. Like it? Press{" "}
                <strong>Copy config</strong> and paste into{" "}
                <Code>design.config.ts</Code>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Presets: {PRESET_NAMES.join(", ")}. Or ask Claude:{" "}
                <Code>/design make it brutalist</Code>.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TerminalSquareIcon
                className="mb-2 size-6 text-primary-text"
                aria-hidden
              />
              <CardTitle>Build with Claude Code</CardTitle>
              <CardDescription>
                Run <Code>claude</Code> in this folder. <Code>/start</Code>{" "}
                picks a kit and design with you; <Code>/setup</Code> connects
                your own Supabase and Vercel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Then just ask: “add a page that lists our team’s projects”.
                Check its work with <Code>pnpm verify</Code>.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
