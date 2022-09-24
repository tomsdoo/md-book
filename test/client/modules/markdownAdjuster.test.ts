import { describe, it } from "mocha";
import { strict as assert } from "assert";
import { JSDOM } from "jsdom";

import { markdownAdjuster } from "../../../src/client/modules/";

declare global {
  // eslint-disable-next-line no-var
  var mermaid: any;
}

describe("markdownAdjuster", () => {
  it("applyMermaid()", () => {
    globalThis.mermaid = {
      init: () => {},
    };
    globalThis.document = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
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
        </body>
      </html>
    `).window.document;
    markdownAdjuster.applyMermaid();

    assert.equal(document.querySelectorAll(".test-target").length, 2);

    assert(
      Array.from(document.querySelectorAll(".test-target")).every((el) =>
        el.classList.contains("language-mermaid")
      )
    );

    assert.equal(
      document.querySelectorAll(".test-target > div.mermaid").length,
      2
    );
  });

  it("applyCopyable()", () => {
    globalThis.document = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
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
        </body>
      </html>
    `).window.document;
    markdownAdjuster.applyCopyable();

    assert.equal(document.querySelectorAll(".test-target").length, 2);

    assert(
      Array.from(document.querySelectorAll(".test-target")).every((el) =>
        el.classList.contains("copyable")
      )
    );

    assert.equal(
      document.querySelectorAll(".test-target > .copy-button").length,
      2
    );
  });

  it("adjustCheckboxes()", () => {
    globalThis.document = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
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
        </body>
      </html>
      `).window.document;
    markdownAdjuster.adjustCheckboxes();

    assert.equal(document.querySelectorAll(".test-target").length, 2);

    assert(
      Array.from(document.querySelectorAll(".test-target")).every((el) =>
        el.classList.contains("check-list")
      )
    );
  });

  it("wrapTable()", () => {
    globalThis.document = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
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
        </body>
      </html>
      `).window.document;
    markdownAdjuster.wrapTable();

    assert.equal(document.querySelectorAll(".test-target").length, 2);

    assert.equal(
      document.querySelectorAll("#article > .table-wrapper > .test-target")
        .length,
      2
    );
  });

  it("adjustLinks()", () => {
    globalThis.document = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
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
        </body>
      </html>
      `).window.document;
    const currentPage = {
      url: "http://localhost:1234/md/testing.md",
    };
    markdownAdjuster.adjustLinks(currentPage);

    assert.equal(document.querySelectorAll(".test-target").length, 2);

    assert(
      Array.from(document.querySelectorAll(".test-target")).every((el) => {
        const expectedUrl = new URL(
          el.getAttribute("data-original-href") as string,
          currentPage.url
        );
        return (
          el.getAttribute("href") ===
          `#/?path=${expectedUrl.origin}${expectedUrl.pathname}`
        );
      })
    );

    assert(
      Array.from(document.querySelectorAll("not-applied")).every(
        (el) =>
          el.getAttribute("data-original-href") === el.getAttribute("href")
      )
    );
  });

  it("adjustImagePaths()", () => {
    globalThis.document = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
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
        </body>
      </html>
      `).window.document;
    const currentPage = {
      url: "http://localhost:1234/md/testing.md",
    };
    markdownAdjuster.adjustImagePaths(currentPage);

    assert.equal(document.querySelectorAll(".test-target").length, 2);

    assert(
      Array.from(document.querySelectorAll(".test-target")).every((el) => {
        const expectedUrl = new URL(
          el.getAttribute("data-original-href") as string,
          currentPage.url
        );
        return (
          el.getAttribute("src") ===
          `${expectedUrl.origin}${expectedUrl.pathname}`
        );
      })
    );

    assert(
      Array.from(document.querySelectorAll("not-applied")).every(
        (el) => el.getAttribute("data-original-href") === el.getAttribute("src")
      )
    );
  });
});
