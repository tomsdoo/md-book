import { describe, it } from "mocha";
import { expect } from "chai";
import { mock } from "sinon";

import { fetchPageContent } from "../../../src/client/modules/fetchPageContent";

let originalFetch: Function;

describe("fetchPageContent()", () => {
  before(() => {
    originalFetch = globalThis.fetch;
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
      .twice()
      .withArgs(path)
      .returns(
        Promise.resolve({
          url: responseUrl,
          status: 200,
          text: async () => await Promise.resolve(responseText),
        })
      );

    expect(
      async () => await fetchPageContent({ type: "plain", path, indexed: true })
    ).to.not.throw();

    const expected = expect(
      await fetchPageContent({
        type: "plain",
        path,
        indexed: true,
      })
    );

    expected.to.include.all.keys([
      "indexed",
      "rawPath",
      "url",
      "status",
      "text",
      "title",
      "html",
    ]);

    expected.to.satisfy(({ status }: any) => status === 200);
    expected.nested.property("indexed").is.a("boolean");
    expected.nested.property("rawPath").is.a("string");
    expected.nested.property("url").is.a("string");
    expected.nested.property("text").is.a("string");
    expected.nested.property("title").is.a("string");
    expected.nested.property("html").is.a("string");

    mocked.verify();
    mocked.restore();
  });
});
