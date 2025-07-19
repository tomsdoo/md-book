import { marked } from "marked";
import { fetchGitHubContent } from "./fetchGitHubContent";
import { PathInterpreter } from "./PathInterpreter";
import { GitHubPageSeed, PageContent, PageSeed } from "./types";

export async function fetchPageContent(
  seed: (Omit<PageSeed, "type"> | Omit<GitHubPageSeed, "type">) & {
    type?: string;
  },
): Promise<PageContent> {
  const lseed = seed.type
    ? seed
    : {
        ...seed,
        ...new PathInterpreter(seed.path).result,
      };
  if (lseed.type === "github") {
    return await fetchGitHubContent(lseed as GitHubPageSeed);
  }
  return await fetchPlainContent(lseed as PageSeed);
}

export async function fetchPlainContent({
  path,
  indexed,
  title,
}: PageSeed): Promise<PageContent> {
  return await globalThis
    .fetch(path)
    .then(async (response: any) => ({
      indexed,
      rawPath: path,
      url: response.url,
      status: response.status,
      text: await response.text(),
    }))
    .then((content: any) => ({
      ...content,
      title: title ?? content.text.split("\n")[0].replace(/^# /, ""),
      html: marked.parse(content.text),
    }));
}
