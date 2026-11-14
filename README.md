# Black CS Success Summit — Starter Template

A starter for your hackathon project. Clone it, pick what you are building, pick a look, and spend your time on your idea instead of on setup.

![The starter's home page in the default "summit" design: a dark page with an orange accent, the headline "Build something real this weekend", a Start a project button, and a list of the seven kits.](docs/screenshots/home-summit.png)

| Same page, different design | A kit, once you add it |
|---|---|
| ![The same home page in the "soft" preset: teal accent, pill-shaped buttons, a floating navigation bar and a centred headline.](docs/screenshots/home-alt-design.png) | ![The dashboard kit's /insights page showing sample data: four stat tiles, a line chart of attendance by month and a donut chart of workshop topics.](docs/screenshots/kit-dashboard.png) |
| One line in `design.config.ts` changes the whole look. | This is the `dashboard` kit at `/insights`, with sample data. |

**What you get**

- A working home page in the summit's dark theme, ready to rewrite for your audience.
- A UI kit (buttons, cards, forms, menus) you can see at `/styleguide`.
- A design system you can switch in one file, so your project does not look like everyone else's.
- Seven optional **kits**, one for each kind of project: website, app, chatbot, game, dashboard, map, learning. You add only the one you need.
- Claude Code set up for this project, with three helpers: `/start`, `/design` and `/setup`.

Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Biome and pnpm.

## Before the hackathon (do this at home, 10 minutes)

**1. Install two things.**

| Tool | How | Check it worked |
|---|---|---|
| [Node.js](https://nodejs.org) **22.6 or newer** | Download the LTS version and install it | `node --version` |
| [pnpm](https://pnpm.io/installation) | `npm install -g pnpm` | `pnpm --version` |

You also need [git](https://git-scm.com/downloads). Most computers already have it.

**2. Get the code and check your setup.** Run these one line at a time:

```bash
git clone https://github.com/Aaron-Douglas/cssummit-startertemplate.git my-project
cd my-project
node scripts/doctor.mjs
pnpm install
```

`node scripts/doctor.mjs` checks your computer and tells you exactly what to fix, with links. Run it again after you fix something. When it says the next step is `pnpm install`, you are on track.

**On Windows?** Use PowerShell or Git Bash, not the old Command Prompt.

**Optional:** install [Claude Code](https://claude.com/claude-code). It makes the day easier, and the project works without it.

## On the day, one command

**With Claude Code:** open Claude Code in your project folder (type `claude` in the terminal) and type:

```
/start
```

It asks who your project is for and what it does, suggests a kit and a design, and sets everything up.

**Without Claude Code:**

```bash
pnpm start-project
pnpm dev
```

Then open http://localhost:3000.

`pnpm start-project` asks your project name, which kit, and which design. At the end it offers to delete the kit folders you did not pick (the answer defaults to no). It needs Node 22.6 or newer.

You can also pass the answers as flags:

```bash
pnpm start-project --name "Block Club Finder" --kits map --design soft --yes
```

| Flag | Meaning |
|---|---|
| `--name "<name>"` | Project name (written to `lib/site.ts` and `package.json`) |
| `--kits a,b` | Kits to add, comma-separated. `--kits none` adds none |
| `--design <preset>` | A preset name, or `shuffle` for a random look |
| `--yes` | Don't ask questions; use only the flags |
| `--prune` | Delete the kit folders you didn't pick (you can't add them later without the original template) |
| `--skip-install` | Don't run `pnpm add` for kit packages |

`pnpm start-project --help` prints the same list.

## Pick a kit

Pick **one** kit. Two at most. Every extra kit is more code to understand and less time for your idea.

| Kit | Build this if… | What it adds | Pages | Needs an account? |
|---|---|---|---|---|
| `website` | You want to share information, resources or events | About, contact and updates pages | `/about`, `/contact`, `/updates` | No |
| `app` | People need to sign up and save things | Sign-up, login, a protected dashboard, profile page | `/login`, `/signup`, `/dashboard`, `/dashboard/profile` | Your own Supabase project (works in demo mode without it) |
| `chatbot` | People ask questions and get guided answers | Chat page using the Claude API | `/chat` | Your own Anthropic API key (gives demo replies without it) |
| `game` | You want to teach or engage through play | Game loop, keyboard/touch controls, score, high scores | `/play` | No |
| `dashboard` | You want to show data about a place or issue | Stat tiles, charts, sortable table | `/insights` | No |
| `map` | Your idea is about places, resources or routes | Map of Chicago with markers and popups | `/map` | No |
| `learning` | You want to teach something step by step | Lessons, quizzes, progress tracking | `/learn` | No |

Watch the names: the `app` kit's signed-in area is `/dashboard`. The `dashboard` kit's charts page is `/insights`.

```bash
pnpm kit list               # see all kits and what is installed
pnpm kit add map            # add a kit later (or several: pnpm kit add map website)
pnpm kit add map --force    # overwrite files you already have
```

- Kits live in `kits/`. They are not part of your app until you add them.
- Each kit folder has a `README.md` (for example `kits/map/README.md`). It says what the kit adds and what to edit first.
- The rules for writing a kit are in `kits/README.md`.

## Pick a design

Your look is one choice per **axis**, saved in `design.config.ts`:

| Axis | Options | Changes |
|---|---|---|
| `shape` | sharp, soft, round, pill, capsule | How rounded corners are |
| `buttons` | offset, solid, outline, glow, brutal, press | Button style and hover effect |
| `surface` | raised, flat, bordered, glass, paper | How cards and panels look |
| `type` | geist, editorial, mono, display, friendly | Fonts for headings and text |
| `layout` | split, centered, editorial, bento, marketplace | Home page layout |
| `nav` | bar, floating, sidebar | Site navigation |
| `density` | compact, comfortable, spacious | Spacing |
| `accent` | orange, teal, green, yellow, rose | Main highlight colour |

**Presets** set every axis at once: `summit` (default), `brutalist`, `soft`, `editorial`, `terminal`, `bento`, `marketplace` (light, rose accent, kits as listing cards).

`design.config.ts` holds an optional `preset` plus any axis values. Axis values win over the preset. This is the `soft` preset with orange as the accent:

```ts
import type { DesignConfig } from "@/lib/design";

const design: DesignConfig = {
  preset: "soft",
  accent: "orange",
};

export default design;
```

The options and presets are defined in `lib/design.ts`.

### The design switcher

While `pnpm dev` is running, a **Design** button sits in the bottom-right corner.

1. Click it. A panel opens that changes every axis live.
2. Press **Shuffle** for a random look.
3. When you like it, press **Copy config** and replace the contents of `design.config.ts` with it.

The switcher's choice is only saved in your browser. `design.config.ts` is what everyone else sees. To show the panel on your deployed site too, set `NEXT_PUBLIC_DESIGN_SWITCHER=true`.

Check `/styleguide` to see every component in your current design:

![The /styleguide page: the heading "Every component, one design" and a table of the current design, one value for each of the eight axes (shape round, buttons offset, surface raised, type geist, layout split, navigation bar, density comfortable, accent orange).](docs/screenshots/styleguide.png)

**Rule for your code:** use the theme's colour names (`bg-background`, `text-foreground`, `bg-card`, `bg-primary`, `text-muted-foreground`, `border-border`). Do not type hex colours or pixel radii into components. That way a design change updates everything.

## Working with Claude Code

Open this folder in [Claude Code](https://claude.com/claude-code) and type:

| Command | What it does |
|---|---|
| `/start` | Asks who your project is for and what it does, suggests a kit and a design, and sets up the project |
| `/design` | Changes the look: "switch to brutalist", "pill buttons", "invent a new preset called westside" |
| `/setup` | Walks you through connecting your own Supabase, Anthropic and Vercel accounts |

- Claude reads `AGENTS.md` at the start of every session. It explains the project rules, so you do not have to repeat them.
- Claude asks before running most commands. It is set up to run these without asking: `pnpm dev`, `pnpm verify`, the `pnpm kit` commands, `pnpm start-project`, and the read-only git commands `git status`, `git diff`, `git log` and `git show`.
- Claude is blocked from reading your `.env.local` file.

## Connect your own accounts

You only need this for the `app` kit, the `chatbot` kit, or to deploy. Run `/setup` in Claude Code for a guided version.

**Use your own accounts.** Do not use a key or project from someone else, from another project, or from the organisers. You sign in yourself, and you paste keys yourself. Never paste a key into a chat.

The full step-by-step guides are in the kit folders:

| Guide | Covers |
|---|---|
| `kits/app/README.md` | Supabase, redirect URLs, Google sign-in |
| `kits/chatbot/README.md` | Anthropic key, cost, spend limits |

The short version:

1. Copy `.env.example` to `.env.local`. This file stays on your computer; git ignores it. (`pnpm kit add` lists each kit's variables in `.env.example`.)
2. **Supabase** (`app` kit): create a free project at [supabase.com](https://supabase.com/dashboard). From **Project Settings → API Keys** (or the **Connect** button), put the Project URL and the **publishable** key in `.env.local` as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Then paste `supabase/migrations/20261114000000_profiles.sql` into the Supabase **SQL Editor** and run it, and add your redirect URLs (see `kits/app/README.md`). Never put the secret / service-role key in a `NEXT_PUBLIC_` variable.
3. **Google sign-in** (optional): set it up under **Authentication → Sign In / Providers → Google** in Supabase, then set `NEXT_PUBLIC_AUTH_GOOGLE_ENABLED=true`.
4. **Anthropic** (`chatbot` kit): create a key at [platform.claude.com](https://platform.claude.com), set a low spend limit, and put it in `.env.local` as `ANTHROPIC_API_KEY`. `ANTHROPIC_MODEL` is optional.
5. Restart `pnpm dev`.

Claude Code can also talk to Supabase and Vercel for you (see `.mcp.json`). Type `/mcp`, pick the service and sign in with **your** account in the browser. No keys are stored in the repo.

## Deploy to your own Vercel

Deploy early, then keep deploying. A live URL is part of your submission.

1. Run `pnpm verify`. It must pass.
2. Push your project to your own GitHub account.
3. Sign in at [vercel.com](https://vercel.com) (the free Hobby plan is enough), click **Add New → Project**, and import your repo.
4. In **Settings → Environment Variables**, add the same variables you have in `.env.local`. Redeploy.
5. Using Supabase sign-in? Add your Vercel URL under **Authentication → URL Configuration** in Supabase.

## Submission checklist

- [ ] Your Vercel URL opens and the main pages work.
- [ ] `pnpm verify` passes.
- [ ] No passwords, API keys or tokens anywhere in the repo. `.env.local` is not committed. (Check with `git status` before you push.)
- [ ] The home page says who the project is for and what problem it solves.
- [ ] You changed the name, tagline and links in `lib/site.ts`.

## Commands

| Command | What it does |
|---|---|
| `node scripts/doctor.mjs` | Checks your setup (Node, pnpm, git, packages, Claude Code) and tells you the next step. Works before `pnpm install`. Also available as `pnpm run doctor`. Do not shorten it to `pnpm doctor`: that runs a different check that is built into pnpm, not this one |
| `pnpm dev` | Start the dev server at http://localhost:3000 |
| `pnpm verify` | Lint and format check (Biome), route types, typecheck, then the production build |
| `pnpm build` | Production build only (what Vercel runs) |
| `pnpm start-project` | First-run wizard: name, kit, design (`--help` for flags) |
| `pnpm kit list` | Show kits |
| `pnpm kit add <name>` | Add a kit |

## Project tour

```
app/                    Pages and routes. Starts with the home page and /styleguide.
components/ui/          Buttons, cards, inputs and more (shadcn/ui). You can edit them.
components/landing/     Home page sections. hero/ has one file per layout option.
components/nav/         Navigation, one file per nav option.
lib/site.ts             Project name, tagline, links. Change this first.
lib/design.ts           Design axes, options and presets.
lib/env.ts              The only place code reads environment variables.
design.config.ts        Your chosen design.
styles/design/          CSS for each design axis.
kits/                   Optional kits. Not in your app until you add one.
kits.installed.json     Which kits you added.
scripts/                The doctor, kit and start-project commands.
docs/screenshots/       The pictures in this README.
.env.example            List of environment variables (no values).
AGENTS.md, CLAUDE.md    Instructions for Claude Code and other AI coding tools.
.claude/                Claude Code skills, rules and settings for this project.
```

## Demo deployment (maintainers)

The public demo shows every kit and the design switcher. It is built from this repo as-is:

- Build command: `pnpm build:demo` (runs `pnpm kit add --all`, which copies every kit and `pnpm add`s their packages, then `next build`). Vercel's normal frozen-lockfile install runs first; the build step then adds the kit packages. It never prompts, so it works in CI.
- Environment variable: `NEXT_PUBLIC_DESIGN_SWITCHER=true`. Nothing else: the `app` and `chatbot` kits run in demo mode.

Learners' projects keep the normal `pnpm build`. Don't commit the result of `pnpm kit add --all` back to the template.
