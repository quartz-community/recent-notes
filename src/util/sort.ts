import type { SortFn } from "@quartz-community/types";
import { getDate } from "./date";

interface GlobalConfiguration {
  defaultDateType: string;
  [key: string]: unknown;
}

export function byDateAndAlphabetical(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    if (f1.dates && f2.dates) {
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime();
    } else if (f1.dates && !f2.dates) {
      return -1;
    } else if (!f1.dates && f2.dates) {
      return 1;
    }

    const f1Title = (f1.frontmatter as { title?: string } | undefined)?.title?.toLowerCase() ?? "";
    const f2Title = (f2.frontmatter as { title?: string } | undefined)?.title?.toLowerCase() ?? "";
    return f1Title.localeCompare(f2Title);
  };
}
