import { GitHubFacade } from "@tomsd/github-repo-js";
import { marked } from "marked";
import { GitHubPageSeed, PageContent } from "./types";

export async function fetchGitHubContent({
  path,
  indexed,
  title,
  type,
  owner,
  repo,
}: GitHubPageSeed): Promise<PageContent> {
  if (type !== "github") {
    throw new Error("invalid type");
  }
  const tokens = JSON.parse(sessionStorage.githubTokens ?? "{}");
  const token = tokens?.[`${owner}/${repo}`];
  const baseContent = {
    indexed,
    rawPath: path,
    url: `github://${owner}.${repo}/${path}`,
  };
  const notFoundContent = {
    ...baseContent,
    status: 404,
    title: "Not Found",
    text: "Not Found",
    html: "Not Found",
  };
  if (token == null) {
    return notFoundContent;
  }
  const github = new GitHubFacade(token);
  const repository = github.repo(owner, repo);
  const { default_branch } = await repository.get();
  const { tree } = await repository.getTree(default_branch);
  const treeItem = tree.find((treeItem) => treeItem.path === path);
  if (treeItem == null) {
    return notFoundContent;
  }
  const blob = await repository.getBlob(treeItem.sha);
  if (blob == null) {
    return notFoundContent;
  }
  try {
    const text = atob(blob.content);
    return {
      ...baseContent,
      status: 200,
      title: title ?? text.split("\n")[0].replace(/^# /, ""),
      text,
      html: await marked.parse(text),
    };
  } catch {
    return notFoundContent;
  }
}
