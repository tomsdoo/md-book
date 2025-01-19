import { describe, expect, it } from "vitest";

import { setHead } from "@/client/modules/setHead";

describe("setHead()", () => {
  const mdBookOptions = {
    header: {
      title: "test",
    },
  };

  it("meta charset will be added if it's not set", async () => {
    document.body.innerHTML = "";

    await setHead(mdBookOptions);

    expect(document.querySelector("head meta[charset]")).toSatisfy(
      (metaTag: HTMLElement) =>
        (metaTag.getAttribute("charset") as string).toLowerCase() === "utf-8",
    );
  });

  it("meta charset will not be added if it's already set", async () => {
    document.body.innerHTML = "";
    document.head.innerHTML = `<meta charset="UTF-16">`;

    await setHead(mdBookOptions);

    expect(document.querySelector("head meta[charset]")).toSatisfy(
      (metaTag: HTMLElement) =>
        (metaTag.getAttribute("charset") as string).toLowerCase() === "utf-16",
    );
  });

  it("title will be added if it's not set", async () => {
    document.body.innerHTML = "";
    document.head.querySelector("title")?.remove();

    await setHead(mdBookOptions);

    expect(document.querySelector("head title")).toSatisfy(
      (titleTag: HTMLElement) =>
        titleTag.textContent === mdBookOptions.header.title,
    );
  });

  it("title will not be added if it's already set", async () => {
    document.body.innerHTML = "";
    const titleTag = document.head.querySelector("title");
    if (titleTag != null) {
      titleTag.innerHTML = "this is a test";
    }

    await setHead(mdBookOptions);

    expect(document.querySelector("head title")).toSatisfy(
      (titleTag: HTMLElement) => titleTag.textContent === "this is a test",
    );
  });

  it("meta viewport will be added if it's not set", async () => {
    document.body.innerHTML = "";
    document.head.querySelector("meta[name='viewport']")?.remove();

    await setHead(mdBookOptions);

    expect(document.querySelector("head meta[name='viewport']")).toSatisfy(
      (metaTag: HTMLElement) =>
        (metaTag.getAttribute("content") as string) ===
        "width=device-width, initial-scale=1",
    );
  });

  it("meta viewport will not be added if it's already set", async () => {
    document.body.innerHTML = "";
    const viewportMeta =
      document.head.querySelector("meta[name='viewport']") ??
      ((metaTag) => {
        metaTag.setAttribute("name", "viewport");
        return metaTag;
      })(document.head.appendChild(document.createElement("meta")));
    viewportMeta.setAttribute("content", "test viewport");

    await setHead(mdBookOptions);

    const expected = expect(
      document.querySelector("head meta[name='viewport']"),
    );
    expected.to.be.an("HTMLMetaElement");
    expected.to.satisfy(
      (metaTag: HTMLElement) =>
        (metaTag.getAttribute("content") as string) === "test viewport",
    );
  });

  it("meta description will be added if it's not set", async () => {
    document.body.innerHTML = "";
    document.head.querySelector("meta[name='description']")?.remove();

    await setHead(mdBookOptions);

    expect(
      document.querySelector("head meta[name='description']"),
    ).not.toBeNull();
  });

  it("meta description will not be added if it's already set", async () => {
    document.body.innerHTML = "";
    const descriptionMeta =
      document.head.querySelector("meta[name='description']") ??
      ((metaTag) => {
        metaTag.setAttribute("name", "description");
        return metaTag;
      })(document.head.appendChild(document.createElement("meta")));
    descriptionMeta.setAttribute("content", "test description");

    await setHead(mdBookOptions);

    expect(document.querySelector("head meta[name='description']")).toSatisfy(
      (metaTag: HTMLElement) =>
        (metaTag.getAttribute("content") as string) === "test description",
    );
  });

  it("mermaid.js should be loaded", async () => {
    document.body.innerHTML = "";

    await setHead(mdBookOptions);

    expect(
      document.querySelector("head script[src$='mermaid.min.js']"),
    ).toSatisfy(
      (scriptTag: HTMLElement) =>
        (scriptTag.getAttribute("src") as string) ===
        "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js",
    );
  });
});
