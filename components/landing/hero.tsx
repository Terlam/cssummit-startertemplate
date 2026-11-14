import { DesignVariant } from "@/components/design-variant";
import type { Design } from "@/lib/design";
import { HeroBento } from "./hero/bento";
import { HeroCentered } from "./hero/centered";
import { HeroEditorial } from "./hero/editorial";
import { HeroMarketplace } from "./hero/marketplace";
import { HeroSplit } from "./hero/split";

/** The landing hero for the current `layout` design axis. */
export function Hero({ layout }: { layout: Design["layout"] }) {
  return (
    <DesignVariant
      axis="layout"
      active={layout}
      variants={{
        split: <HeroSplit />,
        centered: <HeroCentered />,
        editorial: <HeroEditorial />,
        bento: <HeroBento />,
        marketplace: <HeroMarketplace />,
      }}
    />
  );
}
