import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  DM_Sans,
  Fraunces,
  Geist,
  Geist_Mono,
  JetBrains_Mono,
} from "next/font/google";
import type * as React from "react";
import { DesignSwitcher } from "@/components/design-switcher";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import designConfig from "@/design.config";
import { brandHex } from "@/lib/brand";
import {
  designAttributes,
  designCookieScript,
  resolveDesign,
} from "@/lib/design";
import { getSiteUrl, isDesignSwitcherEnabled } from "@/lib/env";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import "./globals.css";

// Every font the `type` axis can use. Only the ones a page actually renders are downloaded.
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  preload: false,
});
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  preload: false,
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  preload: false,
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

// The browser chrome follows the configured surface: light for "paper", dark otherwise.
const light = resolveDesign(designConfig).surface === "paper";

export const viewport: Viewport = {
  themeColor: light ? brandHex.paperGround : brandHex.paper,
  colorScheme: light ? "light" : "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const design = resolveDesign(designConfig);
  const switcher = isDesignSwitcherEnabled();

  return (
    <html
      lang="en"
      {...designAttributes(design)}
      // The design switcher's inline script may change data-* before hydration.
      suppressHydrationWarning
      className={cn(
        "dark",
        geist.variable,
        geistMono.variable,
        fraunces.variable,
        bricolage.variable,
        jetbrains.variable,
        dmSans.variable,
      )}
    >
      <head>
        {switcher ? (
          <script
            // Applies the switcher cookie to <html> before first paint (no flash).
            // biome-ignore lint/security/noDangerouslySetInnerHtml: static script built from lib/design.ts, no user input
            dangerouslySetInnerHTML={{ __html: designCookieScript() }}
          />
        ) : null}
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-50 rounded-control bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader nav={design.nav} />
        <div className="flex min-h-dvh flex-col nav-floating:pt-20 nav-sidebar:lg:pl-64">
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        <Toaster />
        {switcher ? <DesignSwitcher configured={design} /> : null}
      </body>
    </html>
  );
}
