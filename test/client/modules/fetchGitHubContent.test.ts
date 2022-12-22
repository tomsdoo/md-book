import { afterEach, beforeEach, describe, it } from "mocha";
import { expect } from "chai";
import { restore, stub, SinonStub } from "sinon";
import { GitHubRepo } from "@tomsd/github-repo";

import { fetchGitHubContent } from "../../../src/client/modules/fetchGitHubContent";

describe("fetchGitHubContent()", () => {
  let stubGetFileContent: SinonStub;
  beforeEach(() => {
    // @ts-expect-error
    globalThis.sessionStorage = {};
  });
  afterEach(() => {
    restore();
  });
  it("404 if no token", async () => {
    globalThis.sessionStorage.githubTokens = JSON.stringify({});
    stubGetFileContent = stub(GitHubRepo.prototype, "getFileContent").returns(
      Promise.resolve("dummyText")
    );
    expect(
      await fetchGitHubContent({
        path: "dummyPath",
        indexed: true,
        type: "github",
        owner: "dummyOwner",
        repo: "dummyRepo",
      }).then((content) => JSON.stringify(content))
    ).to.equals(
      JSON.stringify({
        indexed: true,
        rawPath: "dummyPath",
        url: "github://dummyOwner.dummyRepo/dummyPath",
        status: 404,
        title: "Not Found",
        text: "Not Found",
        html: "Not Found",
      })
    );
    stubGetFileContent.restore();
  });
  it("404 if error is thrown", async () => {
    globalThis.sessionStorage.githubTokens = JSON.stringify({
      "dummyOwner/dummyRepo": "dummyToken",
    });
    stubGetFileContent = stub(GitHubRepo.prototype, "getFileContent").returns(
      Promise.reject(new Error("dummyError"))
    );
    expect(
      await fetchGitHubContent({
        path: "dummyPath",
        indexed: true,
        type: "github",
        owner: "dummyOwner",
        repo: "dummyRepo",
      }).then((content) => JSON.stringify(content))
    ).to.equals(
      JSON.stringify({
        indexed: true,
        rawPath: "dummyPath",
        url: "github://dummyOwner.dummyRepo/dummyPath",
        status: 404,
        title: "Not Found",
        text: "Not Found",
        html: "Not Found",
      })
    );
    stubGetFileContent.restore();
  });
  it("success", async () => {
    globalThis.sessionStorage.githubTokens = JSON.stringify({
      "dummyOwner/dummyRepo": "dummyToken",
    });
    stubGetFileContent = stub(GitHubRepo.prototype, "getFileContent").returns(
      Promise.resolve("dummyText")
    );
    expect(
      await fetchGitHubContent({
        path: "dummyPath",
        indexed: true,
        type: "github",
        owner: "dummyOwner",
        repo: "dummyRepo",
      }).then((content) => JSON.stringify(content))
    ).to.equals(
      JSON.stringify({
        indexed: true,
        rawPath: "dummyPath",
        url: "github://dummyOwner.dummyRepo/dummyPath",
        status: 200,
        title: "dummyText",
        text: "dummyText",
        html: "<p>dummyText</p>\n",
      })
    );
    stubGetFileContent.restore();
  });
});
