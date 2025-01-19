import { beforeEach, describe, expect, it } from "vitest";

import { getGithubTokens } from "@/client/modules/getGithubTokens";

describe("getGithubTokens()", () => {
  const repositoryInfos = [
    { owner: "owner1", repo: "repo1" },
    { owner: "owner2", repo: "repo2" },
  ];

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("div.github-token-area-wrapper exists", async () => {
    getGithubTokens(repositoryInfos).catch((e) => {
      throw e;
    });
    await new Promise((resolve) => setTimeout(resolve, 1));
    expect(
      document.querySelector("div.github-token-area-wrapper"),
    ).not.toBeNull();
  });

  it("div.github-token-area exists", async () => {
    getGithubTokens(repositoryInfos).catch((e) => {
      throw e;
    });
    await new Promise((resolve) => setTimeout(resolve, 1));
    expect(document.querySelector("div.github-token-area")).not.toBeNull();
  });

  it("ul.form-list exists", async () => {
    getGithubTokens(repositoryInfos).catch((e) => {
      throw e;
    });
    await new Promise((resolve) => setTimeout(resolve, 1));
    const selector = ["div.github-token-area", "ul.form-list"].join(" > ");
    expect(document.querySelector(selector)).not.toBeNull();
  });

  it("li.form-item exists", async () => {
    getGithubTokens(repositoryInfos).catch((e) => {
      throw e;
    });
    await new Promise((resolve) => setTimeout(resolve, 1));
    const selector = [
      "div.github-token-area",
      "ul.form-list",
      "li.form-item",
    ].join(" > ");
    expect(document.querySelectorAll(selector)).toHaveLength(
      repositoryInfos.length,
    );
  });

  it("div.repo exists", async () => {
    getGithubTokens(repositoryInfos).catch((e) => {
      throw e;
    });
    await new Promise((resolve) => setTimeout(resolve, 1));
    const selector = [
      "div.github-token-area",
      "ul.form-list",
      "li.form-item",
      "div.repo",
    ].join(" > ");
    expect(document.querySelectorAll(selector)).toHaveLength(
      repositoryInfos.length,
    );
  });

  it("input.tokenbox exists", async () => {
    getGithubTokens(repositoryInfos).catch((e) => {
      throw e;
    });
    await new Promise((resolve) => setTimeout(resolve, 1));
    const selector = [
      "div.github-token-area",
      "ul.form-list",
      "li.form-item",
      "input.tokenbox",
    ].join(" > ");
    const expected = expect(document.querySelectorAll(selector));
    expected.toHaveLength(repositoryInfos.length);
    expected.satisfy((nodeList: NodeList) =>
      (Array.from(nodeList) as HTMLDivElement[]).every((div: HTMLDivElement) =>
        div.hasAttribute("data-repo"),
      ),
    );
  });

  it("button.ok-button exists", async () => {
    getGithubTokens(repositoryInfos).catch((e) => {
      throw e;
    });
    await new Promise((resolve) => setTimeout(resolve, 1));
    const selector = ["div.github-token-area", "button.ok-button"].join(" > ");
    expect(document.querySelector(selector)).not.toBeNull();
  });

  it("resolve", async () => {
    let tokens = null;
    getGithubTokens(repositoryInfos).then((t) => {
      tokens = t;
    });

    await new Promise((resolve) => setTimeout(resolve, 1));
    (
      document.querySelector(
        ".tokenbox[data-repo='owner1/repo1",
      ) as HTMLInputElement
    ).value = "token1";
    (
      document.querySelector(
        ".tokenbox[data-repo='owner2/repo2",
      ) as HTMLInputElement
    ).value = "token2";
    (document.querySelector("button.ok-button") as HTMLButtonElement).click();

    await new Promise((resolve) => setTimeout(resolve, 1));

    expect(tokens).toHaveProperty("owner1/repo1", "token1");
    expect(tokens).toHaveProperty("owner2/repo2", "token2");
    await new Promise((resolve) => setTimeout(resolve, 1));
    expect(document.querySelector(".github-token-area")).toBeNull();
  });

  it("parameter length === 0", async () => {
    await expect(getGithubTokens([])).resolves.toEqual({});
  });
});
