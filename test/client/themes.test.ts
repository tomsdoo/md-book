import { describe, it } from "mocha";
import { expect } from "chai";
import { JSDOM, ConstructorOptions } from "jsdom";
import { theme } from "../../src/client/themes";

describe("theme", () => {
  const domOptions: ConstructorOptions = {
    url: "https://example.org/",
    referrer: "https://example.com/",
    contentType: "text/html",
    runScripts: "dangerously",
    resources: "usable",
    storageQuota: 10000000,
  };

  it("getNames()", () => {
    const expected = expect(theme.getNames());
    expected.to.be.an("Array");
    expected.to.have.lengthOf(5);
  });

  it("getCssPath()", () => {
    const expected = expect(theme.getCssPath("test-name"));
    expected.to.be.a("string");
    expected.to.equal(
      `https://cdn.jsdelivr.net/npm/@tomsd/md-book/public/css/test-name.css`
    );
  });

  it("applyTheme()", () => {
    globalThis.document = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <head></head>
        <body></body>
      </html>
      `,
      domOptions
    ).window.document;
    theme.apply("dark");

    const expected = expect(
      document.querySelector("head link[rel='stylesheet'][href$='dark.css']")
    );
    expected.to.be.an("HTMLLinkElement");
  });
});
