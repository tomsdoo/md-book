import { GitHubFacade } from "@tomsd/github-repo-js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchGitHubContent } from "@/client/modules/fetchGitHubContent";

const { testContent, dummyTree, dummyBlob } = vi.hoisted(() => {
  const testContent = "dummyText";
  return {
    testContent,
    dummyTree: [
      {
        path: "dummyPath",
        mode: "100644",
        type: "blob",
        sha: "dummySha",
        size: null,
        url: "dummyUrl",
      },
    ],
    dummyBlob: {
      content: btoa(testContent),
      encoding: "base64",
      url: "dummyUrl",
      sha: "dummySha",
      size: null,
      node_id: "dummyNodeId",
    },
  };
});

describe("fetchGitHubContent()", () => {
  beforeEach(() => {
    // @ts-expect-error
    globalThis.sessionStorage = {};
    vi.spyOn(GitHubFacade.prototype, "repo").mockReturnValue({
      get: async () => ({
        default_branch: "dummyBranch",
      }),
      getTree: async () => ({
        sha: "dummySha",
        truncated: false,
        tree: dummyTree,
      }),
      getBlob: async () => dummyBlob,
    } as unknown as ReturnType<GitHubFacade["repo"]>);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("404 if no token", async () => {
    globalThis.sessionStorage.githubTokens = JSON.stringify({});

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
  it("404 if not found", async () => {
    globalThis.sessionStorage.githubTokens = JSON.stringify({
      "dummyOwner/dummyRepo": "dummyToken",
    });
    await expect(
      fetchGitHubContent({
        path: "dummyPathNoExist",
        indexed: true,
        type: "github",
        owner: "dummyOwner",
        repo: "dummyRepo",
      }),
    ).resolves.toEqual({
      indexed: true,
      rawPath: "dummyPathNoExist",
      url: "github://dummyOwner.dummyRepo/dummyPathNoExist",
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
      title: testContent,
      text: testContent,
      html: `<p>${testContent}</p>\n`,
    });
  });
});
