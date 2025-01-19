import { GitHubRepo } from "@tomsd/github-repo";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { fetchGitHubContent } from "@/client/modules/fetchGitHubContent";

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
    await expect(
      fetchGitHubContent({
        path: "dummyPath",
        indexed: true,
        type: "github",
        owner: "dummyOwner",
        repo: "dummyRepo",
      }),
    ).resolves.toEqual({
      indexed: true,
      rawPath: "dummyPath",
      url: "github://dummyOwner.dummyRepo/dummyPath",
      status: 404,
      title: "Not Found",
      text: "Not Found",
      html: "Not Found",
    });
  });
  it("404 if error is thrown", async () => {
    globalThis.sessionStorage.githubTokens = JSON.stringify({
      "dummyOwner/dummyRepo": "dummyToken",
    });
    vi.spyOn(GitHubRepo.prototype, "getFileContent").mockRejectedValue(
      new Error("dummyError"),
    );
    await expect(
      fetchGitHubContent({
        path: "dummyPath",
        indexed: true,
        type: "github",
        owner: "dummyOwner",
        repo: "dummyRepo",
      }),
    ).resolves.toEqual({
      indexed: true,
      rawPath: "dummyPath",
      url: "github://dummyOwner.dummyRepo/dummyPath",
      status: 404,
      title: "Not Found",
      text: "Not Found",
      html: "Not Found",
    });
  });
  it("success", async () => {
    globalThis.sessionStorage.githubTokens = JSON.stringify({
      "dummyOwner/dummyRepo": "dummyToken",
    });
    vi.spyOn(GitHubRepo.prototype, "getFileContent").mockResolvedValue(
      "dummyText",
    );
    await expect(
      fetchGitHubContent({
        path: "dummyPath",
        indexed: true,
        type: "github",
        owner: "dummyOwner",
        repo: "dummyRepo",
      }),
    ).resolves.toEqual({
      indexed: true,
      rawPath: "dummyPath",
      url: "github://dummyOwner.dummyRepo/dummyPath",
      status: 200,
      title: "dummyText",
      text: "dummyText",
      html: "<p>dummyText</p>\n",
    });
  });
});
