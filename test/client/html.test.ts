import { expect } from "chai";
import { ConstructorOptions, JSDOM } from "jsdom";
import { before, describe, it } from "mocha";
import { bodyHtml } from "../../src/client/html";

describe("body html", () => {
  const domOptions: ConstructorOptions = {
    url: "https://example.org/",
    referrer: "https://example.com/",
    contentType: "text/html",
    runScripts: "dangerously",
    resources: "usable",
    storageQuota: 10000000,
  };

  before(() => {
    globalThis.document = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <head></head>
        <body>
          ${bodyHtml}
        </body>
      </html>
      `,
      domOptions,
    ).window.document;
  });

  it("header#header", () => {
    expect(document.querySelector("header#header")).to.be.an("HTMLElement");
  });

  it("header#header > vue-header", () => {
    const expected = expect(
      document.querySelector("header#header > vue-header"),
    );
    expected.to.be.an("HTMLElement");
    expected.to.satisfy(
      (vueHeaderTag: HTMLElement) =>
        vueHeaderTag.getAttribute(":options") === "headerOptions",
    );
  });

  it("footer#footer", () => {
    expect(document.querySelector("footer#footer")).to.be.an("HTMLElement");
  });

  it("footer#footer > vue-footer", () => {
    const expected = expect(
      document.querySelector("footer#footer > vue-footer"),
    );
    expected.to.be.an("HTMLElement");
    expected.to.satisfy(
      (vueFooterTag: HTMLElement) =>
        vueFooterTag.getAttribute(":options") === "footerOptions",
    );
  });

  it("main#app", () => {
    expect(document.querySelector("main#app[v-cloak]")).to.be.an("HTMLElement");
  });

  it("main#app > router-view", () => {
    const expected = expect(document.querySelector("main#app > router-view"));
    expected.to.be.an("HTMLElement");
    expected.to.satisfy(
      (routerViewTag: HTMLElement) =>
        routerViewTag.getAttribute("v-slot") === "{ Component }",
    );
  });

  it("main#app > router-view > transition", () => {
    const expected = expect(
      document.querySelector("main#app > router-view > transition"),
    );
    expected.to.be.an("HTMLUnknownElement");
    expected.to.satisfy(
      (transitionTag: HTMLElement) =>
        transitionTag.getAttribute("name") === "fade",
    );
  });

  it("main#app > router-view > transition > component", () => {
    const expected = expect(
      document.querySelector("main#app > router-view > transition > component"),
    );
    expected.to.be.an("HTMLUnknownElement");
    expected.to.satisfy(
      (componentTag: HTMLElement) =>
        componentTag.getAttribute(":is") === "Component" &&
        componentTag.getAttribute(":book-options") === "bookOptions" &&
        componentTag.getAttribute(":page-contents") === "pageContents" &&
        componentTag.getAttribute(":indexed-page-contents") ===
          "indexedPageContents",
    );
  });
});
