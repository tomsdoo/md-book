import { describe, it } from "mocha";
import { strict as assert } from "assert";
import { mock } from "sinon";

import { marked } from "marked";
import { fetchPageContent } from "../../../src/client/modules/fetchPageContent";

let originalFetch: Function;

describe("fetchPageContent()", () => {
  before(() => {
    // @ts-expect-error
    originalFetch = global.fetch;
    // @ts-expect-error
    globalThis.fetch = async (path: string) =>
      await Promise.resolve({
        url: path,
        status: 200,
        text: async () => await Promise.resolve("test text"),
      });
  });

  after(() => {
    // @ts-expect-error
    globalThis.fetch = originalFetch;
  });

  it("status 200", async () => {
    const path = "https://test.com/md/test.md";
    const responseUrl = path;
    const responseText = "# test\nthis is a test";
    const mocked = mock(globalThis);
    mocked
      .expects("fetch")
      .once()
      .withArgs(path)
      .returns(
        Promise.resolve({
          url: responseUrl,
          status: 200,
          text: async () => await Promise.resolve(responseText),
        })
      );

    assert.equal(
      JSON.stringify(
        await fetchPageContent({
          path,
          indexed: true,
        })
      ),
      JSON.stringify({
        indexed: true,
        rawPath: path,
        url: responseUrl,
        status: 200,
        text: responseText,
        title: "test",
        html: marked.parse(responseText),
      })
    );

    mocked.verify();
    mocked.restore();
  });
});
