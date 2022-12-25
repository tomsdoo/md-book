import { beforeEach, describe, it } from "mocha";
import { expect } from "chai";
import { JSDOM, ConstructorOptions } from "jsdom";

import { getGithubTokens } from "../../../src/client/modules/getGithubTokens";

describe("getGithubTokens()", () => {
  const domOptions: ConstructorOptions = {
    url: "https://example.com/",
    referrer: "https://example.com/",
    contentType: "text/html",
    runScripts: "dangerously",
    resources: "usable",
    storageQuota: 10000000,
  };
  const repositoryInfos = [
    { owner: "owner1", repo: "repo1" },
    { owner: "owner2", repo: "repo2" },
  ];

  beforeEach(() => {
    globalThis.document = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <head></head>
        <body></body>
      </html>
      `,
      domOptions
    ).window.document;
  });

  it("div.github-token-area-wrapper exists", (done) => {
    getGithubTokens(repositoryInfos).catch((e) => {
      throw e;
    });
    setTimeout(() => {
      const expected = expect(
        document.querySelector("div.github-token-area-wrapper")
      );
      expected.to.be.an("HTMLDivElement");
      done();
    }, 1);
  });

  it("div.github-token-area exists", (done) => {
    getGithubTokens(repositoryInfos).catch((e) => {
      throw e;
    });
    setTimeout(() => {
      const expected = expect(document.querySelector("div.github-token-area"));
      expected.to.be.an("HTMLDivElement");
      done();
    }, 1);
  });

  it("ul.form-list exists", (done) => {
    getGithubTokens(repositoryInfos).catch((e) => {
      throw e;
    });
    setTimeout(() => {
      const selector = ["div.github-token-area", "ul.form-list"].join(" > ");
      const expected = expect(document.querySelector(selector));
      expected.to.be.an("HTMLUListElement");
      done();
    }, 1);
  });

  it("li.form-item exists", (done) => {
    getGithubTokens(repositoryInfos).catch((e) => {
      throw e;
    });
    setTimeout(() => {
      const selector = [
        "div.github-token-area",
        "ul.form-list",
        "li.form-item",
      ].join(" > ");
      const expected = expect(document.querySelectorAll(selector));
      expected.to.have.lengthOf(repositoryInfos.length);
      done();
    }, 1);
  });

  it("div.repo exists", (done) => {
    getGithubTokens(repositoryInfos).catch((e) => {
      throw e;
    });
    setTimeout(() => {
      const selector = [
        "div.github-token-area",
        "ul.form-list",
        "li.form-item",
        "div.repo",
      ].join(" > ");
      const expected = expect(document.querySelectorAll(selector));
      expected.to.have.lengthOf(repositoryInfos.length);
      done();
    }, 1);
  });

  it("input.tokenbox exists", (done) => {
    getGithubTokens(repositoryInfos).catch((e) => {
      throw e;
    });
    setTimeout(() => {
      const selector = [
        "div.github-token-area",
        "ul.form-list",
        "li.form-item",
        "input.tokenbox",
      ].join(" > ");
      const expected = expect(document.querySelectorAll(selector));
      expected.to.have.lengthOf(repositoryInfos.length);
      expected.satisfy((nodeList: NodeList) =>
        (Array.from(nodeList) as HTMLDivElement[]).every(
          (div: HTMLDivElement) => div.hasAttribute("data-repo")
        )
      );
      done();
    }, 1);
  });

  it("button.ok-button exists", (done) => {
    getGithubTokens(repositoryInfos).catch((e) => {
      throw e;
    });
    setTimeout(() => {
      const selector = ["div.github-token-area", "button.ok-button"].join(
        " > "
      );
      const expected = expect(document.querySelector(selector));
      expected.to.be.an("HTMLButtonElement");
      done();
    }, 1);
  });

  it("resolve", (done) => {
    getGithubTokens(repositoryInfos)
      .then((tokens) => {
        expect(tokens).to.have.property("owner1/repo1", "token1");
        expect(tokens).to.have.property("owner2/repo2", "token2");
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(document.querySelector(".github-token-area")).to.be.null;
          done();
        }, 1);
      })
      .catch((e) => {
        throw e;
      });
    setTimeout(() => {
      (
        document.querySelector(
          ".tokenbox[data-repo='owner1/repo1"
        ) as HTMLInputElement
      ).value = "token1";
      (
        document.querySelector(
          ".tokenbox[data-repo='owner2/repo2"
        ) as HTMLInputElement
      ).value = "token2";
      (document.querySelector("button.ok-button") as HTMLButtonElement).click();
    }, 1);
  });

  it("parameter length === 0", async () => {
    const expected = expect(
      await getGithubTokens([]).then((result) => JSON.stringify(result))
    );
    expected.to.equals("{}");
  });
});
