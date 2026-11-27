import { describe, expect, it } from "vitest";
import type { QuartzComponentProps } from "@quartz-community/types";
import { RecentNotes } from "../src/index";
import type { RecentNotesOptions } from "../src/components/RecentNotes";
import { renderToHtml } from "./render";

const note = (
  slug: string,
  title: string,
  modified?: string,
  extra: Record<string, unknown> = {},
) => ({
  slug,
  frontmatter: { title, tags: (extra.tags as string[]) ?? [] },
  ...(modified ? { dates: { modified: new Date(modified), created: new Date("2000-01-01") } } : {}),
  ...extra,
});

const allFiles = [
  note("notes/old", "Old", "2021-01-01T00:00:00Z", { tags: ["garden"] }),
  note("notes/new", "New", "2024-05-01T00:00:00Z", { tags: ["garden", "nested/tag"] }),
  note("notes/mid", "Mid", "2023-01-01T00:00:00Z"),
  note("tags/garden", "Tag: garden", "2025-01-01T00:00:00Z"),
  note("notes/index", "Notes folder", "2025-02-01T00:00:00Z"),
  note("notes/secret", "Secret", "2026-01-01T00:00:00Z", { unlisted: true }),
];

function render(
  opts?: Partial<RecentNotesOptions>,
  current = "notes/deep/page",
  cfg: Record<string, unknown> = {},
) {
  const html = renderToHtml(
    RecentNotes(opts)({
      allFiles,
      fileData: { slug: current },
      cfg: { defaultDateType: "modified", ...cfg },
    } as unknown as QuartzComponentProps),
  );
  const notes = [
    ...html.matchAll(/<h3><a href="([^"]*)" class="internal">([^<]*)<\/a><\/h3>/g),
  ].map((m) => [m[2], m[1]]);
  return { html, notes };
}

describe("RecentNotes, rendered", () => {
  it("lists the 3 newest listed notes, linked relative to the current page", () => {
    const { html, notes } = render();
    expect(html).toMatch(/^<div class="recent-notes"><h3>Recent Notes<\/h3><ul class="recent-ul">/);
    expect(notes).toEqual([
      ["Notes folder", "../../notes/"],
      ["Tag: garden", "../../tags/garden"],
      ["New", "../../notes/new"],
    ]);
    expect(html).not.toContain("Secret");
  });

  it("shows each note's date and its tags as tag links", () => {
    const { html } = render({ hideTagPages: true, hideFolderPages: true, limit: 1 });
    expect(html).toContain('<time datetime="2024-05-01T00:00:00.000Z">May 01, 2024</time>');
    expect(html).toContain('<a class="internal tag-link" href="../../tags/garden">garden</a>');
    expect(html).toContain(
      '<a class="internal tag-link" href="../../tags/nested/tag">nested/tag</a>',
    );
    expect(
      render({ hideTagPages: true, hideFolderPages: true, showTags: false }).html,
    ).not.toContain("tag-link");
  });

  it("honours hideTagPages, hideFolderPages, limit and filter", () => {
    expect(render({ hideTagPages: true, hideFolderPages: true }).notes.map(([t]) => t)).toEqual([
      "New",
      "Mid",
      "Old",
    ]);
    expect(render({ hideTagPages: true }).notes.map(([t]) => t)).toEqual([
      "Notes folder",
      "New",
      "Mid",
    ]);
    expect(render({ hideFolderPages: true, limit: 1 }).notes.map(([t]) => t)).toEqual([
      "Tag: garden",
    ]);
    expect(
      render({ filter: (f) => (f.frontmatter?.tags ?? []).includes("garden") }).notes.map(
        ([t]) => t,
      ),
    ).toEqual(["New", "Old"]);
  });

  it("honours title and a custom sort", () => {
    const { html, notes } = render({
      title: "Latest",
      hideTagPages: true,
      hideFolderPages: true,
      sort: (a, b) => (a.frontmatter!.title! < b.frontmatter!.title! ? -1 : 1),
    });
    expect(html).toContain("<h3>Latest</h3>");
    expect(notes.map(([t]) => t)).toEqual(["Mid", "New", "Old"]);
  });

  it("links to more notes with linkToMore when some are left out", () => {
    const { html } = render({ linkToMore: "recent" as never, limit: 2 }, "index");
    expect(html).toContain('<p><a href="./recent">See 3 more →</a></p>');
    expect(render({ linkToMore: "recent" as never, limit: 10 }).html).not.toContain("more →");
    expect(render({ limit: 2 }).html).not.toContain("more →");
  });

  it("uses the site locale for the heading and dates", () => {
    const { html } = render({ limit: 1, hideTagPages: true, hideFolderPages: true }, "index", {
      locale: "de-DE",
    });
    expect(html).toContain("<h3>Zuletzt bearbeitete Seiten</h3>");
    expect(html).toContain(
      `>${new Date("2024-05-01T00:00:00Z").toLocaleDateString("de-DE", { year: "numeric", month: "short", day: "2-digit" })}</time>`,
    );
  });
});
