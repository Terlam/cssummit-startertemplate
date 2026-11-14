<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Black CS Success Summit starter

A starter for hackathon teams (up to 4 people, mixed experience, many beginners). They build a focused prototype for a Chicago community audience. Judges look at community impact, intentional technology, technical execution, design & UX, and story. The submission needs a working URL and no secrets in the repo.

Explain what you do in plain language. Prefer small, working steps over big rewrites.

## Stack

Next.js 16 (App Router; `proxy.ts`, not `middleware.ts`), React 19, TypeScript strict, Tailwind v4, shadcn/ui, Biome, pnpm. Dark by default; the `paper` surface (used by the `marketplace` preset) is the one light option.

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server on http://localhost:3000 |
| `pnpm verify` | `biome check && next typegen && tsc --noEmit && next build`. Must pass before you say you are done |
| `pnpm start-project` | First-run wizard: name, kits, design. Flags: `--name "<name>" --kits a,b\|none --design <preset>\|shuffle --yes`, plus `--prune` (delete unused kit folders; only when the team agrees) and `--skip-install`. `--help` prints them |
| `pnpm kit list` | Show kits and which are installed |
| `pnpm kit add <name...>` | Install one or more kits (`--force` overwrites existing files, `--skip-install` skips `pnpm add`). `--all` adds every kit; it is for the public demo build (`pnpm build:demo`), not for teams |

Node 22.6 or newer is required (`engines` in `package.json`).

Skills: `/start` (plan the project), `/design` (change the look), `/setup` (connect the team's own accounts).

## Structure

- `app/` routes. Core ships the landing page and `/styleguide`. Kits add more routes when installed.
- `components/ui/` shadcn components. `components/landing/hero/` and `components/nav/` hold layout and nav variants.
- `lib/site.ts` name, tagline, links. `lib/design.ts` design axes and presets. `lib/env.ts` all env access.
- `design.config.ts` the project's chosen design: an optional `preset` plus axis overrides (`{ preset: "soft", accent: "orange" }`; overrides win). `styles/design/<axis>.css` CSS for each design axis.
- `kits/<name>/` optional features (`kit.json` + `files/` mirroring the project root). Not part of the app until installed. `kits.installed.json` records installed kits.

## Design rules

- Use semantic tokens only: `bg-background`, `text-foreground`, `bg-card`, `bg-primary`, `text-primary-foreground`, `text-muted-foreground`, `border-border`, `rounded-*` from the scale, etc. Never hardcode hex/rgb colours, pixel radii or font families in components.
- Change the look through `design.config.ts` (one value per axis) or the axis files in `styles/design/`. Do not restyle individual components to fake a new look. Use the `/design` skill.
- After a visual change, check `/styleguide` and the page you changed.

## Kit rules

- Add kits only with `pnpm kit add <name>`. Never copy files out of `kits/` by hand, and never import from `kits/` in app code.
- Recommend one kit. Two at most. More kits means more to debug and less time on the idea.
- Kits and their routes: `website` (`/about`, `/contact`, `/updates`), `app` (Supabase auth: `/login`, `/signup`, `/dashboard`, `/dashboard/profile`), `chatbot` (Claude API: `/chat`), `game` (`/play`), `dashboard` (charts: `/insights`), `map` (MapLibre, no key: `/map`), `learning` (`/learn`). Each kit's `kits/<name>/README.md` explains it; `kits/app/README.md` and `kits/chatbot/README.md` have the account steps.

## Env rules

- Read env vars only through `lib/env.ts`. Every variable must be listed in `.env.example` (names and comments only, never values).
- Real values live in `.env.local` (git-ignored) and in the team's Vercel project settings.
- Core needs no env vars. `app` and `chatbot` run in demo mode without theirs.
- Anything without `NEXT_PUBLIC_` is server-only. A Supabase service-role or secret key must never reach client code.
- Do not read `.env`, `.env.local` or other secret env files. Ask the learner whether a variable is set instead.

## Accounts are yours

The learner's project runs on the learner's own accounts. Not the organiser's, not a teammate's employer's, not anything else found on this machine.

- The learner signs in to their **own** Supabase, Vercel and Anthropic accounts in their browser or through `/mcp`. You never sign in for them.
- Never reuse a project ref, URL, key or token found elsewhere on the machine (other repos, global config, shell history, other `.mcp.json` files). If you see one, ignore it.
- Never create resources (projects, databases, deployments, keys) on an account or organisation the learner does not own. If an MCP shows several organisations, ask which one is theirs.
- Before creating anything, say what it is and what it costs (free tier or a price), and wait for a yes.
- Never ask the learner to paste a secret into chat. They paste secrets into `.env.local` or the Vercel dashboard themselves.
- Never commit secrets. Before any commit, check that no key or token is in the diff.

## Definition of done

- Run `pnpm verify` and read the output. It must pass.
- For UI work, open the page in the browser and look at it (desktop and ~375px wide).
- Evidence before assertion: report what you ran and what you saw. If you could not check something, say so.
