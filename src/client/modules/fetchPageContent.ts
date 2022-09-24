import { marked } from "marked";

export interface PageSeed {
  path: string;
  indexed: boolean;
  title?: string;
}

export interface PageContent {
  indexed: boolean;
  rawPath: string;
  url: string;
  status: number;
  text: string;
  title: string;
  html: string;
}

export async function fetchPageContent({
  path,
  indexed,
  title,
}: PageSeed): Promise<PageContent> {
  return await globalThis
    .fetch(path)
    .then(async (response) => ({
      indexed,
      rawPath: path,
      url: response.url,
      status: response.status,
      text: await response.text(),
    }))
    .then((content) => ({
      ...content,
      title: title ?? content.text.split("\n")[0].replace(/^# /, ""),
      html: marked.parse(content.text),
    }));
}
