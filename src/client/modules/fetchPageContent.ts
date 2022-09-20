import * as marked from "marked";

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
}): Promise<PageContent> {
  return await fetch(path)
    .then(async (response) => ({
      indexed,
      rawPath: path,
      url: response.url,
      status: response.status,
      text: await response.text(),
    }))
    .then((content) => ({
      ...content,
      title: content.text.split("\n")[0].replace(/^# /, ""),
      html: marked.parse(content.text),
    }));
}
