import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzPluginData,
  SortFn,
  ValidDateType,
} from "@quartz-community/types";
import { formatDate } from "@quartz-community/utils/date";
import { byDateAndAlphabetical, getDate } from "@quartz-community/utils/sort";
import { classNames } from "../util/lang";
import { i18n } from "../i18n";
import { resolveRelative } from "../util/path";
import style from "./styles/recentNotes.scss";

type QuartzComponentConstructor<Options extends object | undefined = undefined> = (
  opts: Options,
) => QuartzComponent;

type RecentNotesPluginData = QuartzPluginData & {
  slug?: string;
  filePath?: string;
  dates?: Record<string, Date>;
  frontmatter?: {
    title?: string;
    tags?: string[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

interface GlobalConfiguration {
  locale: string;
  defaultDateType: ValidDateType;
  [key: string]: unknown;
}

export interface RecentNotesOptions {
  title?: string;
  limit: number;
  linkToMore: string | false;
  showTags: boolean;
  filter: (f: RecentNotesPluginData) => boolean;
  sort: SortFn;
}

const withDefaultDateType = (
  data: RecentNotesPluginData,
  defaultDateType: ValidDateType,
): QuartzPluginData => ({
  ...data,
  defaultDateType,
});

export function filterListedPages<T>(pages: T[]): T[] {
  return pages.filter((p) => (p as { unlisted?: unknown }).unlisted !== true);
}

const byDateAndAlphabeticalWithConfig = (cfg: GlobalConfiguration): SortFn => {
  const sortFn = byDateAndAlphabetical();
  return (f1, f2) =>
    sortFn(
      withDefaultDateType(f1 as RecentNotesPluginData, cfg.defaultDateType),
      withDefaultDateType(f2 as RecentNotesPluginData, cfg.defaultDateType),
    );
};

const defaultOptions = (cfg: GlobalConfiguration): RecentNotesOptions => ({
  limit: 3,
  linkToMore: false,
  showTags: true,
  filter: () => true,
  sort: byDateAndAlphabeticalWithConfig(cfg),
});

export default ((userOpts?: Partial<RecentNotesOptions>) => {
  const RecentNotes: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps & { displayClass?: string }) => {
    const globalCfg = cfg as unknown as GlobalConfiguration;
    const opts = { ...defaultOptions(globalCfg), ...userOpts };
    const pages = filterListedPages(allFiles as RecentNotesPluginData[])
      .filter(opts.filter)
      .sort(opts.sort);
    const remaining = Math.max(0, pages.length - opts.limit);
    const slug = fileData.slug as string | undefined;
    const locale = cfg.locale ?? "en-US";
    return (
      <div class={classNames(displayClass, "recent-notes")}>
        <h3>{opts.title ?? i18n(locale).components.recentNotes.title}</h3>
        <ul class="recent-ul">
          {pages.slice(0, opts.limit).map((page) => {
            const title = page.frontmatter?.title ?? "Untitled";
            const tags = page.frontmatter?.tags ?? [];

            return (
              <li class="recent-li">
                <div class="section">
                  <div class="desc">
                    <h3>
                      <a href={resolveRelative(slug!, page.slug!)} class="internal">
                        {title}
                      </a>
                    </h3>
                  </div>
                  {page.dates && getDate(withDefaultDateType(page, globalCfg.defaultDateType)) && (
                    <p class="meta">
                      <time
                        datetime={getDate(
                          withDefaultDateType(page, globalCfg.defaultDateType),
                        )!.toISOString()}
                      >
                        {formatDate(
                          getDate(withDefaultDateType(page, globalCfg.defaultDateType))!,
                          locale,
                        )}
                      </time>
                    </p>
                  )}
                  {opts.showTags && (
                    <ul class="tags">
                      {tags.map((tag) => (
                        <li>
                          <a class="internal tag-link" href={resolveRelative(slug!, `tags/${tag}`)}>
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        {opts.linkToMore && remaining > 0 && (
          <p>
            <a href={resolveRelative(slug!, opts.linkToMore)}>
              {i18n(locale).components.recentNotes.seeRemainingMore({ remaining })}
            </a>
          </p>
        )}
      </div>
    );
  };

  RecentNotes.css = style;
  return RecentNotes;
}) satisfies QuartzComponentConstructor;
