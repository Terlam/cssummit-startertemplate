import {
  BookOpenIcon,
  BotIcon,
  ChartColumnIcon,
  Gamepad2Icon,
  GlobeIcon,
  KeyRoundIcon,
  type LucideIcon,
  MapIcon,
} from "lucide-react";

/** Landing page copy. Short and concrete: the readers are students at a hackathon. */
export const hero = {
  eyebrow: "Hackathon starter",
  titleStart: "Build something",
  titleEm: "real",
  titleEnd: "this weekend.",
  lede: "A Next.js starter in the summit's colours. Pick a kit for what you're building, remix the design in one click, and let Claude Code do the heavy lifting.",
  primary: { label: "Start a project", href: "#get-started" },
  secondary: { label: "See the styleguide", href: "/styleguide" },
};

export type KitSummary = {
  name: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  /** The routes the kit adds. */
  pages: string[];
  /** The account the team must bring, if any. Kits without one say "No account needed". */
  account?: string;
};

/** The seven kits from the Hackathon 101 deck. Each is opt-in: `pnpm kit add <name>`. */
export const kitCatalog: KitSummary[] = [
  {
    name: "website",
    title: "Website",
    blurb: "About, contact and content pages.",
    icon: GlobeIcon,
    pages: ["/about", "/contact", "/updates"],
  },
  {
    name: "app",
    title: "App",
    blurb: "Sign-in and a dashboard on your own Supabase.",
    icon: KeyRoundIcon,
    pages: ["/login", "/signup", "/dashboard"],
    account: "Your own Supabase (demo mode without)",
  },
  {
    name: "chatbot",
    title: "Chatbot",
    blurb: "Streaming chat on the Claude API.",
    icon: BotIcon,
    pages: ["/chat"],
    account: "Your own Anthropic key (demo replies without)",
  },
  {
    name: "game",
    title: "Game",
    blurb: "Canvas game loop, input and high scores.",
    icon: Gamepad2Icon,
    pages: ["/play"],
  },
  {
    name: "dashboard",
    title: "Dashboard",
    blurb: "Stat tiles, charts and a sortable table.",
    icon: ChartColumnIcon,
    pages: ["/insights"],
  },
  {
    name: "map",
    title: "Map",
    blurb: "A Chicago map with markers. No API key.",
    icon: MapIcon,
    pages: ["/map"],
  },
  {
    name: "learning",
    title: "Learning",
    blurb: "Lessons, quizzes and progress.",
    icon: BookOpenIcon,
    pages: ["/learn"],
  },
];

export const wizardLines = [
  { prompt: true, text: "pnpm start-project" },
  { prompt: false, text: "◆ Project name › study-buddy" },
  { prompt: false, text: "◆ Kits › chatbot, learning" },
  { prompt: false, text: "◆ Design › shuffle" },
  { prompt: false, text: "✔ Ready. Run pnpm dev" },
];
