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
    // @ts-expect-error
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
