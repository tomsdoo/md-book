import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { fetchPlainContent } from "../../../src/client/modules/fetchPageContent";

let originalFetch: Function;

describe("fetchPlainContent()", () => {
  beforeEach(() => {
    originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(
      async () => new Response("# test\nthis is a test"),
    );
  });

  afterEach(() => {
    // @ts-expect-error
    globalThis.fetch = originalFetch;
  });

  it("status 200", async () => {
    const path = "https://test.com/md/test.md";

    expect(
      async () =>
        await fetchPlainContent({ type: "plain", path, indexed: true }),
    ).not.toThrow();

    const expected = expect(
      await fetchPlainContent({
        type: "plain",
        path,
        indexed: true,
      }),
    );

    expected.toSatisfy(({ status }: any) => status === 200);
    expected.toHaveProperty("indexed", true);
    expected.toHaveProperty("rawPath", "https://test.com/md/test.md");
    expected.toHaveProperty("url", "");
    expected.toHaveProperty("text", "# test\nthis is a test");
    expected.toHaveProperty("title", "test");
    expected.toSatisfy(({ html }: any) => typeof html === "string");
  });
});
