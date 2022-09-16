import { createApp } from "vue";
import { bodyHtml } from "./html";

import VueHeader from "./components/header.vue";
import VueFooter from "./components/footer.vue";

import { router } from "./router/";

import * as marked from "marked";

import "destyle.css";

type MdFiles = {
  indexedPaths: string[];
  hiddenPaths: string[];
};

async function fetchPageContent({ path, indexed }) {
  return fetch(path)
    .then(async (response) => ({
      indexed,
      rawPath: path,
      url: response.url,
      text: await response.text(),
    }))
    .then((content) => ({
      ...content,
      title: content.text.split("\n")[0].replace(/^# /, ""),
      html: marked.parse(content.text),
    }));
}

export async function start(mdFiles: MdFiles){
  console.log(mdFiles);

  window.addEventListener("load", async () => {
    const pageContents = await Promise.all([
      ...mdFiles.indexedPaths.map(path => ({ path, indexed: true })),
      ...mdFiles.hiddenPaths.map(path => ({ path, indexed: false }))
    ].map(fetchPageContent));

    console.log(pageContents);
    document.body.innerHTML = bodyHtml;
    const app = createApp({
      data: () => ({
        pageContents,
        indexedPageContents: pageContents.filter(({ indexed }) => indexed)
      })
    });
    app.use(router);
    app.mount("#app");

    const header = createApp({
      components: {
        VueHeader
      }
    });
    header.use(router);
    header.mount("#header");

    const footer = createApp({
      components: {
        VueFooter
      }
    });
    footer.mount("#footer");
  });
}
