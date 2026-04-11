import { describe, expect, it } from "vitest";
import { RecentNotes, filterListedPages } from "../src/index";

describe("RecentNotes", () => {
  it("is exported as a function", () => {
    expect(typeof RecentNotes).toBe("function");
  });

  it("returns a component with css property", () => {
    const component = RecentNotes();
    expect(typeof component).toBe("function");
    expect(typeof component.css).toBe("string");
  });
});

describe("filterListedPages", () => {
  it("excludes pages marked unlisted: true", () => {
    const pages = [
      { slug: "a" },
      { slug: "b", unlisted: true },
      { slug: "c" },
      { slug: "d", unlisted: false },
    ];
    const result = filterListedPages(pages);
    expect(result.map((p) => p.slug)).toEqual(["a", "c", "d"]);
  });

  it("returns pages unchanged when none are unlisted", () => {
    const pages = [{ slug: "a" }, { slug: "b" }];
    expect(filterListedPages(pages)).toEqual(pages);
  });

  it("handles empty input", () => {
    expect(filterListedPages([])).toEqual([]);
  });
});
