---
name: start
description: Kick off a new hackathon project from this starter. Interviews the team about who the project is for and what it does, recommends one kit (two at most) and a design preset, runs `pnpm start-project`, then shows where to edit first. Use when a team says "let's start", "help us pick", or has just cloned the repo.
argument-hint: "[short idea, optional]"
---

# Start a project

Goal: in about ten minutes, the team has a named project, one kit installed, a look they like, and knows which file to open first. Keep it friendly and short. Ask one or two questions at a time.

If the team already described the idea in `$ARGUMENTS`, use it and skip questions it already answers.

## 1. Interview

Ask, in plain words:

1. **Who is it for?** A specific group in Chicago (for example: students at one school, parents on one block, small business owners on one street).
2. **What problem does it solve for them?** One sentence.
3. **What will someone do on it in the first minute?** This tells you the build type.
4. **Who is on the team, and how much have they coded?** Helps you pick something they can finish.

Then map their answer to one of the seven build types:

| Build type | Kit | Needs an account? |
|---|---|---|
| Website (info, resources, events) | `website` (`/about`, `/contact`, `/updates`) | No |
| App (people sign up, save things) | `app` (`/login`, `/signup`, `/dashboard`) | Their own Supabase project (demo mode without it) |
| Chatbot (answers questions, guides people) | `chatbot` (`/chat`) | Their own Anthropic API key (works with demo replies without one) |
| Game (teach or engage through play) | `game` (`/play`) | No |
| Dashboard (show data about a place or issue) | `dashboard` (`/insights`) | No |
| Map (places, resources, routes) | `map` (`/map`) | No |
| Learning experience (lessons, quizzes) | `learning` (`/learn`) | No |

## 2. Recommend

- Recommend **one** kit and say why in one sentence. Offer a second only if the idea clearly needs it (for example `map` + `website`). Never more than two.
- If they are mostly beginners, prefer kits that need no account.
- If they pick `app` or `chatbot`, tell them they will connect their own account later with `/setup`, and that it works in demo mode until then.
- Suggest a design preset that fits the audience: `summit` (default, bold), `soft` (friendly, rounded), `editorial` (story, serif), `brutalist` (loud, high contrast), `terminal` (techy, mono), `bento` (lots of tiles), `marketplace` (light, friendly, browse-and-pick). Or offer `shuffle` for a random look they can tweak later.

Wait for the team to agree before running anything.

## 3. Run the wizard

Run it non-interactively with flags:

```
pnpm start-project --name "<Project name>" --kits <kit>[,<kit>] --design <preset> --yes
```

`--design shuffle` picks a random look instead of a preset. `--kits none` adds no kit. `pnpm start-project --help` lists every flag.

Ask before adding `--prune`: it deletes the kit folders the team did not pick, and they cannot add those kits later without re-downloading the template. Only add it if the team says yes.

The wizard needs Node 22.6 or newer. If it fails with "Could not load lib/design.ts", ask the team to run `node --version` and update Node.

Read the output. If it fails, show the error and fix the cause before going on. Then run `pnpm verify` and confirm it passes.

## 4. Show where to edit first

Start `pnpm dev` (or the `dev` launch config) and open http://localhost:3000. Then point to:

- `lib/site.ts`: project name, tagline, links. Change these first.
- `components/landing/`: the home page sections. Rewrite the copy for their audience.
- The kit's own page (`/about`, `/dashboard`, `/chat`, `/play`, `/insights`, `/map` or `/learn`) and its "what to edit first" note (printed by the wizard, and in `kits/<name>/README.md` and `kits/<name>/kit.json`).
- `design.config.ts`: the look. The **Design** button in the bottom-right corner (in `pnpm dev`) lets them try options live, then "Copy config" and paste it over `design.config.ts`.

End with three next steps, for example: write the real headline and who it is for; build the one screen that shows the idea; deploy early to their own Vercel (`/setup`).
