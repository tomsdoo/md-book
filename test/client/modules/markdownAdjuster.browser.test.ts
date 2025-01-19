import { describe, expect, it } from "vitest";

import { markdownAdjuster } from "@/client/modules/markdownAdjuster";

declare global {
  var mermaid: any;
}

describe("markdownAdjuster", () => {
  it("applyMermaid()", () => {
    globalThis.mermaid = {
      init: () => {
        // nop
      },
    };
    document.body.innerHTML = `
          <div id="article">
            <pre class="test-target">
              <code class="language-mermaid">
                erDiagram
                AAA ||--o{ BBB : relate
              </code>
            </pre>
            <pre class="test-target">
              <code class="language-mermaid">
                erDiagram
                CCC ||--o{ DDD : relate
              </code>
            </pre>
          </div>
    `;
    markdownAdjuster.applyMermaid();

    expect(document.querySelectorAll(".test-target")).toHaveLength(2);

    expect(document.querySelectorAll(".test-target")).toSatisfy(
      (elementList: NodeList) =>
        Array.from(elementList).every((el) =>
          (el as HTMLElement).classList.contains("language-mermaid"),
        ),
    );

    expect(
      document.querySelectorAll(".test-target > div.mermaid"),
    ).toHaveLength(2);
  });

  it("applyCopyable()", () => {
    document.body.innerHTML = `
          <div id="article">
            <pre class="test-target">
              <code class="hljs">
                this is a test
              </code>
            </pre>
            <pre class="test-target">
              <code class="hljs">
                this is a test
              </code>
            </pre>
          </div>
    `;
    markdownAdjuster.applyCopyable();

    expect(document.querySelectorAll(".test-target")).toHaveLength(2);

    expect(document.querySelectorAll(".test-target")).toSatisfy(
      (elementList: NodeList) =>
        Array.from(elementList).every((el) =>
          (el as HTMLElement).classList.contains("copyable"),
        ),
    );

    expect(
      document.querySelectorAll(".test-target > .copy-button"),
    ).toHaveLength(2);
  });

  it("adjustCheckboxes()", () => {
    document.body.innerHTML = `
          <div id="article">
            <ul class="test-target">
              <li>
                <input type="checkbox" />
              </li>
            </ul>
            <ol class="test-target">
              <li>
                <input type="checkbox" checked />
              </li>
            </ol>
          </div>
      `;
    markdownAdjuster.adjustCheckboxes();

    expect(document.querySelectorAll(".test-target")).toHaveLength(2);

    expect(document.querySelectorAll(".test-target")).toSatisfy(
      (elementList: NodeList) =>
        Array.from(elementList).every((el) =>
          (el as HTMLElement).classList.contains("check-list"),
        ),
    );
  });

  it("wrapTable()", () => {
    document.body.innerHTML = `
          <div id="article">
            <table class="test-target">
              <thead>
                <tr>
                  <th>test</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td>test</td>
              </tr>
              </tbody>
            </table>
            <table class="test-target">
              <thead>
                <tr>
                  <th>test</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td>test</td>
              </tr>
              </tbody>
            </table>
          </div>
      `;
    markdownAdjuster.wrapTable();

    expect(document.querySelectorAll(".test-target")).toHaveLength(2);

    expect(
      document.querySelectorAll("#article > .table-wrapper > .test-target"),
    ).toHaveLength(2);
  });

  it("adjustLinks()", () => {
    document.body.innerHTML = `
          <div id="article">
            <p>
              test sentence
              <a class="test-target" data-original-href="./test.md" href="./test.md">test link</a>
            </p>
            <h2>
              heading
              <a class="test-target" data-original-href="../test/test.md" href="../test/test.md">test link</a>
            </h2>
            <h4>
              heading
              <a class="not-applied" data-original-href="https://www.google.com" href="https://www.google.com">google</a>
            </h4>
          </div>
      `;
    const currentPage = {
      url: "http://localhost:1234/md/testing.md",
    };
    markdownAdjuster.adjustLinks(currentPage);

    expect(document.querySelectorAll(".test-target")).toHaveLength(2);

    expect(document.querySelectorAll(".test-target")).toSatisfy(
      (elementList: NodeList) =>
        Array.from(elementList).every((el) => {
          const expectedUrl = new URL(
            (el as HTMLElement).getAttribute("data-original-href") as string,
            currentPage.url,
          );
          return (
            (el as HTMLElement).getAttribute("href") ===
            `#/?path=${expectedUrl.origin}${expectedUrl.pathname}`
          );
        }),
    );

    expect(document.querySelectorAll("not-applied")).toSatisfy(
      (elementList: NodeList) =>
        Array.from(elementList).every(
          (el) =>
            (el as HTMLElement).getAttribute("data-original-href") ===
            (el as HTMLElement).getAttribute("href"),
        ),
    );
  });

  it("adjustLinks() for github path", () => {
    document.body.innerHTML = `
          <div id="article">
            <p>
              test sentence
              <a class="test-target" data-expected-href="/md/test.md" href="./test.md">test link</a>
            </p>
            <h2>
              heading
              <a class="test-target" data-expected-href="/test/test.md" href="../test/test.md">test link</a>
            </h2>
            <h4>
              heading
              <a class="not-applied" data-original-href="https://www.google.com" href="https://www.google.com">google</a>
            </h4>
          </div>
      `;
    const currentPage = {
      url: "github://owner.repo/md/testing.md",
    };
    markdownAdjuster.adjustLinks(currentPage);

    expect(document.querySelectorAll(".test-target")).toHaveLength(2);

    expect(document.querySelectorAll(".test-target")).toSatisfy(
      (elementList: NodeList) =>
        Array.from(elementList).every((el) => {
          const expectedUrl = `github://owner.repo${
            (el as HTMLAnchorElement).getAttribute(
              "data-expected-href",
            ) as string
          }`;
          return (
            (el as HTMLElement).getAttribute("href") ===
            `#/?path=${expectedUrl}`
          );
        }),
    );

    expect(document.querySelectorAll("not-applied")).toSatisfy(
      (elementList: NodeList) =>
        Array.from(elementList).every(
          (el) =>
            (el as HTMLElement).getAttribute("data-original-href") ===
            (el as HTMLElement).getAttribute("href"),
        ),
    );
  });

  it("adjustImagePaths()", () => {
    document.body.innerHTML = `
          <div id="article">
            <p>
              <img
                class="test-target"
                data-original-href="./test.png"
                src="./test.png"
              />
            </p>
            <p>
              <img
                class="test-target"
                data-original-href="../test/test.png"
                src="../test/test.png"
              />
            </p>
            <p>
              heading
              <img
                class="not-applied"
                data-original-href="https://some.domain/test.jpg"
                src="https://some.domain/test.jpg"
              />
            </p>
          </div>
      `;
    const currentPage = {
      url: "http://localhost:1234/md/testing.md",
    };
    markdownAdjuster.adjustImagePaths(currentPage);

    expect(document.querySelectorAll(".test-target")).toHaveLength(2);

    expect(document.querySelectorAll(".test-target")).toSatisfy(
      (elementList: NodeList) =>
        Array.from(elementList).every((el) => {
          const expectedUrl = new URL(
            (el as HTMLElement).getAttribute("data-original-href") as string,
            currentPage.url,
          );
          return (
            (el as HTMLElement).getAttribute("src") ===
            `${expectedUrl.origin}${expectedUrl.pathname}`
          );
        }),
    );

    expect(document.querySelectorAll("not-applied")).toSatisfy(
      (elementList: NodeList) =>
        Array.from(elementList).every(
          (el) =>
            (el as HTMLElement).getAttribute("data-original-href") ===
            (el as HTMLElement).getAttribute("src"),
        ),
    );
  });
});
