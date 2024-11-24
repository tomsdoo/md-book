import { beforeEach, describe, expect, it } from "vitest";
import { bodyHtml } from "../../src/client/html";

describe("body html", () => {
  beforeEach(() => {
    document.body.innerHTML = bodyHtml;
  });

  it("header#header", () => {
    expect(document.querySelector("header#header")).not.toBeNull();
  });

  it("header#header > vue-header", () => {
    expect(document.querySelector("header#header > vue-header")).toSatisfy(
      (vueHeaderTag: HTMLElement) =>
        vueHeaderTag.getAttribute(":options") === "headerOptions",
    );
  });

  it("footer#footer", () => {
    expect(document.querySelector("footer#footer")).not.toBeNull();
  });

  it("footer#footer > vue-footer", () => {
    expect(document.querySelector("footer#footer > vue-footer")).toSatisfy(
      (vueFooterTag: HTMLElement) =>
        vueFooterTag.getAttribute(":options") === "footerOptions",
    );
  });

  it("main#app", () => {
    expect(document.querySelector("main#app[v-cloak]")).not.toBeNull();
  });

  it("main#app > router-view", () => {
    expect(document.querySelector("main#app > router-view")).toSatisfy(
      (routerViewTag: HTMLElement) =>
        routerViewTag.getAttribute("v-slot") === "{ Component }",
    );
  });

  it("main#app > router-view > transition", () => {
    expect(
      document.querySelector("main#app > router-view > transition"),
    ).toSatisfy(
      (transitionTag: HTMLElement) =>
        transitionTag.getAttribute("name") === "fade",
    );
  });

  it("main#app > router-view > transition > component", () => {
    expect(
      document.querySelector("main#app > router-view > transition > component"),
    ).toSatisfy(
      (componentTag: HTMLElement) =>
        componentTag.getAttribute(":is") === "Component" &&
        componentTag.getAttribute(":book-options") === "bookOptions" &&
        componentTag.getAttribute(":page-contents") === "pageContents" &&
        componentTag.getAttribute(":indexed-page-contents") ===
          "indexedPageContents",
    );
  });
});
