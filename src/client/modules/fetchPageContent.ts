import { marked } from "marked";
import { PageSeed, PageContent } from "./types";

export async function fetchPageContent({
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
