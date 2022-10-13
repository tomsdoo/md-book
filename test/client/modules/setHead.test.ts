import { describe, it } from "mocha";
import { expect } from "chai";
import { JSDOM, ConstructorOptions } from "jsdom";

import { setHead } from "../../../src/client/modules/setHead";

describe("setHead()", () => {
  const domOptions: ConstructorOptions = {
    url: "https://example.org/",
    referrer: "https://example.com/",
    contentType: "text/html",
    runScripts: "dangerously",
    resources: "usable",
    storageQuota: 10000000,
  };

  const mdBookOptions = {
    header: {
      title: "test",
    },
  };

  it("meta charset will be added if it's not set", async () => {
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

    await setHead(mdBookOptions);

    const expected = expect(document.querySelector("head meta[charset]"));
    expected.to.be.an("HTMLMetaElement");
    expected.to.satisfy(
      (metaTag: HTMLElement) =>
        (metaTag.getAttribute("charset") as string).toLowerCase() === "utf-8"
    );
  });

  it("meta charset will not be added if it's already set", async () => {
    globalThis.document = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-16">
        </head>
        <body></body>
      </html>
      `,
      domOptions
    ).window.document;

    await setHead(mdBookOptions);

    const expected = expect(document.querySelector("head meta[charset]"));
    expected.to.be.an("HTMLMetaElement");
    expected.to.satisfy(
      (metaTag: HTMLElement) =>
        (metaTag.getAttribute("charset") as string).toLowerCase() === "utf-16"
    );
  });

  it("title will be added if it's not set", async () => {
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

    await setHead(mdBookOptions);

    const expected = expect(document.querySelector("head title"));
    expected.to.be.an("HTMLTitleElement");
    expected.to.satisfy(
      (titleTag: HTMLElement) =>
        titleTag.textContent === mdBookOptions.header.title
    );
  });

  it("title will not be added if it's already set", async () => {
    globalThis.document = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>this is a test</title>
        </head>
        <body></body>
      </html>
      `,
      domOptions
    ).window.document;

    await setHead(mdBookOptions);

    const expected = expect(document.querySelector("head title"));
    expected.to.be.an("HTMLTitleElement");
    expected.to.satisfy(
      (titleTag: HTMLElement) => titleTag.textContent === "this is a test"
    );
  });

  it("meta viewport will be added if it's not set", async () => {
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

    await setHead(mdBookOptions);

    const expected = expect(
      document.querySelector("head meta[name='viewport']")
    );
    expected.to.be.an("HTMLMetaElement");
    expected.to.satisfy(
      (metaTag: HTMLElement) =>
        (metaTag.getAttribute("content") as string) ===
        "width=device-width, initial-scale=1"
    );
  });

  it("meta viewport will not be added if it's already set", async () => {
    globalThis.document = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="test viewport" />
        </head>
        <body></body>
      </html>
      `,
      domOptions
    ).window.document;

    await setHead(mdBookOptions);

    const expected = expect(
      document.querySelector("head meta[name='viewport']")
    );
    expected.to.be.an("HTMLMetaElement");
    expected.to.satisfy(
      (metaTag: HTMLElement) =>
        (metaTag.getAttribute("content") as string) === "test viewport"
    );
  });

  it("meta description will be added if it's not set", async () => {
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

    await setHead(mdBookOptions);

    const expected = expect(
      document.querySelector("head meta[name='description']")
    );
    expected.to.be.an("HTMLMetaElement");
  });

  it("meta description will not be added if it's already set", async () => {
    globalThis.document = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="description" content="test description" />
        </head>
        <body></body>
      </html>
      `,
      domOptions
    ).window.document;

    await setHead(mdBookOptions);

    const expected = expect(
      document.querySelector("head meta[name='description']")
    );
    expected.to.be.an("HTMLMetaElement");
    expected.to.satisfy(
      (metaTag: HTMLElement) =>
        (metaTag.getAttribute("content") as string) === "test description"
    );
  });

  it("mermaid.js should be loaded", async () => {
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

    await setHead(mdBookOptions);

    const expected = expect(
      document.querySelector("head script[src$='mermaid.min.js']")
    );
    expected.to.be.an("HTMLScriptElement");
    expected.to.satisfy(
      (scriptTag: HTMLElement) =>
        (scriptTag.getAttribute("src") as string) ===
        "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"
    );
  });
});
