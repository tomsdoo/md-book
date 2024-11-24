import { GitHubRepo } from "@tomsd/github-repo";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { fetchGitHubContent } from "../../../src/client/modules/fetchGitHubContent";

describe("fetchGitHubContent()", () => {
  beforeEach(() => {
    // @ts-expect-error
    globalThis.sessionStorage = {};
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("404 if no token", async () => {
    globalThis.sessionStorage.githubTokens = JSON.stringify({});
    vi.spyOn(GitHubRepo.prototype, "getFileContent").mockResolvedValue(
      "dummyText",
    );
    expect(
      await fetchGitHubContent({
        path: "dummyPath",
        indexed: true,
        type: "github",
        owner: "dummyOwner",
        repo: "dummyRepo",
      }).then((content) => JSON.stringify(content)),
    ).toEqual(
      JSON.stringify({
        indexed: true,
        rawPath: "dummyPath",
        url: "github://dummyOwner.dummyRepo/dummyPath",
        status: 404,
        title: "Not Found",
        text: "Not Found",
        html: "Not Found",
      }),
    );
  });
  it("404 if error is thrown", async () => {
    globalThis.sessionStorage.githubTokens = JSON.stringify({
      "dummyOwner/dummyRepo": "dummyToken",
    });
    vi.spyOn(GitHubRepo.prototype, "getFileContent").mockRejectedValue(
      new Error("dummyError"),
    );
    expect(
      await fetchGitHubContent({
        path: "dummyPath",
        indexed: true,
        type: "github",
        owner: "dummyOwner",
        repo: "dummyRepo",
      }).then((content) => JSON.stringify(content)),
    ).toEqual(
      JSON.stringify({
        indexed: true,
        rawPath: "dummyPath",
        url: "github://dummyOwner.dummyRepo/dummyPath",
        status: 404,
        title: "Not Found",
        text: "Not Found",
        html: "Not Found",
      }),
    );
  });
  it("success", async () => {
    globalThis.sessionStorage.githubTokens = JSON.stringify({
      "dummyOwner/dummyRepo": "dummyToken",
    });
    vi.spyOn(GitHubRepo.prototype, "getFileContent").mockResolvedValue(
      "dummyText",
    );
    expect(
      await fetchGitHubContent({
        path: "dummyPath",
        indexed: true,
        type: "github",
        owner: "dummyOwner",
        repo: "dummyRepo",
      }).then((content) => JSON.stringify(content)),
    ).toEqual(
      JSON.stringify({
        indexed: true,
        rawPath: "dummyPath",
        url: "github://dummyOwner.dummyRepo/dummyPath",
        status: 200,
        title: "dummyText",
        text: "dummyText",
        html: "<p>dummyText</p>\n",
      }),
    );
  });
});
