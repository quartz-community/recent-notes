import { joinSegments, simplifySlug as simplifySlug$1 } from '@quartz-community/utils';
import { jsxs, jsx } from 'preact/jsx-runtime';

// src/util/lang.ts
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/i18n/locales/en-US.ts
var en_US_default = {
  components: {
    recentNotes: {
      title: "Recent Notes",
      seeRemainingMore: ({ remaining }) => `See ${remaining} more \u2192`
    }
  }
};

// src/i18n/index.ts
var locales = {
  "en-US": en_US_default
};
function i18n(locale) {
  return locales[locale] || en_US_default;
}
function simplifySlug(fp) {
  return simplifySlug$1(fp);
}
function resolveRelative(current, target) {
  const simplified = simplifySlug(target);
  const rootPath = pathToRoot(current);
  return joinSegments(rootPath, simplified);
}
function pathToRoot(slug) {
  let rootPath = slug.split("/").filter((x) => x !== "").slice(0, -1).map((_) => "..").join("/");
  if (rootPath.length === 0) {
    rootPath = ".";
  }
  return rootPath;
}

// src/util/date.ts
function getDate(cfg, data) {
  if (!cfg.defaultDateType) {
    throw new Error(
      "Field 'defaultDateType' was not set in the configuration object of quartz.config.ts."
    );
  }
  return data.dates?.[cfg.defaultDateType];
}
function formatDate(d, locale = "en-US") {
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });
}

// src/util/sort.ts
function byDateAndAlphabetical(cfg) {
  return (f1, f2) => {
    if (f1.dates && f2.dates) {
      return getDate(cfg, f2).getTime() - getDate(cfg, f1).getTime();
    } else if (f1.dates && !f2.dates) {
      return -1;
    } else if (!f1.dates && f2.dates) {
      return 1;
    }
    const f1Title = f1.frontmatter?.title?.toLowerCase() ?? "";
    const f2Title = f2.frontmatter?.title?.toLowerCase() ?? "";
    return f1Title.localeCompare(f2Title);
  };
}

// src/components/styles/recentNotes.scss
var recentNotes_default = ".recent-notes > h3 {\n  margin: 0.5rem 0 0 0;\n  font-size: 1rem;\n}\n.recent-notes > ul.recent-ul {\n  list-style: none;\n  margin-top: 1rem;\n  padding-left: 0;\n}\n.recent-notes > ul.recent-ul > li {\n  margin: 1rem 0;\n}\n.recent-notes > ul.recent-ul > li .section > .desc > h3 > a {\n  background-color: transparent;\n}\n.recent-notes > ul.recent-ul > li .section > .meta {\n  margin: 0 0 0.5rem 0;\n  opacity: 0.6;\n}";
var defaultOptions = (cfg) => ({
  limit: 3,
  linkToMore: false,
  showTags: true,
  filter: () => true,
  sort: byDateAndAlphabetical(cfg)
});
var RecentNotes_default = ((userOpts) => {
  const RecentNotes = ({
    allFiles,
    fileData,
    displayClass,
    cfg
  }) => {
    const globalCfg = cfg;
    const opts = { ...defaultOptions(globalCfg), ...userOpts };
    const pages = allFiles.filter(opts.filter).sort(opts.sort);
    const remaining = Math.max(0, pages.length - opts.limit);
    const slug = fileData.slug;
    const locale = cfg.locale ?? "en-US";
    return /* @__PURE__ */ jsxs("div", { class: classNames(displayClass, "recent-notes"), children: [
      /* @__PURE__ */ jsx("h3", { children: opts.title ?? i18n(locale).components.recentNotes.title }),
      /* @__PURE__ */ jsx("ul", { class: "recent-ul", children: pages.slice(0, opts.limit).map((page) => {
        const title = page.frontmatter?.title ?? "Untitled";
        const tags = page.frontmatter?.tags ?? [];
        return /* @__PURE__ */ jsx("li", { class: "recent-li", children: /* @__PURE__ */ jsxs("div", { class: "section", children: [
          /* @__PURE__ */ jsx("div", { class: "desc", children: /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx("a", { href: resolveRelative(slug, page.slug), class: "internal", children: title }) }) }),
          page.dates && /* @__PURE__ */ jsx("p", { class: "meta", children: /* @__PURE__ */ jsx("time", { datetime: getDate(globalCfg, page)?.toISOString(), children: formatDate(getDate(globalCfg, page), locale) }) }),
          opts.showTags && /* @__PURE__ */ jsx("ul", { class: "tags", children: tags.map((tag) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { class: "internal tag-link", href: resolveRelative(slug, `tags/${tag}`), children: tag }) })) })
        ] }) });
      }) }),
      opts.linkToMore && remaining > 0 && /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: resolveRelative(slug, opts.linkToMore), children: i18n(locale).components.recentNotes.seeRemainingMore({ remaining }) }) })
    ] });
  };
  RecentNotes.css = recentNotes_default;
  return RecentNotes;
});

export { RecentNotes_default as RecentNotes };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map