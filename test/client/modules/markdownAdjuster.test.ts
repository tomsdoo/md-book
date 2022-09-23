import { describe, it } from "mocha";
import { strict as assert } from "assert";
import { JSDOM } from "jsdom";

import { markdownAdjuster } from "../../../src/client/modules/";

declare global {
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
});
