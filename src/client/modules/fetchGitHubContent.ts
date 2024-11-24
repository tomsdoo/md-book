import { GitHubRepo } from "@tomsd/github-repo";
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
  return await new GitHubRepo(token, owner, repo)
    .getFileContent(path)
    .then((text) => text as unknown)
    .then((text) => text as string)
    .then(async (text: string) => ({
      ...baseContent,
      status: 200,
      title: title ?? text.split("\n")[0].replace(/^# /, ""),
      text,
      html: await marked.parse(text),
    }))
    .catch(() => notFoundContent);
}
