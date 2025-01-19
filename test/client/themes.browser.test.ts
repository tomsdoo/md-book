import { theme } from "@/client/themes";
import { describe, expect, it } from "vitest";

describe("theme", () => {
  it("getNames()", () => {
    expect(theme.getNames()).toHaveLength(5);
  });

  it("getCssPath()", () => {
    expect(theme.getCssPath("test-name")).toBe(
      `https://cdn.jsdelivr.net/npm/@tomsd/md-book/public/css/test-name.css`,
    );
  });

  it("applyTheme()", () => {
    document.body.innerHTML = "";

    theme.apply("dark");

    expect(
      document.querySelector("head link[rel='stylesheet'][href$='dark.css']"),
    ).not.toBeNull();
  });
});
