import "destyle.css";
import "highlight.js/styles/stackoverflow-light.css";
import "./css/style.css";
import "./css/cloak.css";
import "./css/fade.css";
import "./css/initial-loading.css";

import { createApp } from "vue";
import { bodyHtml } from "./html";

import VueHeader from "./components/header.vue";
import VueFooter from "./components/footer.vue";

import { router } from "./router/";

import {
  fetchPageContents,
  FetchPageContentOptions,
  setHead,
} from "./modules/";

interface MdFiles {
  indexedPaths: Array<string | { path: string; title: string }>;
  hiddenPaths: Array<string | { path: string; title: string }>;
}

type CoreOptions = FetchPageContentOptions;

export interface MdBookOptions {
  mdFiles: MdFiles;
  header?: {
    title?: string;
  };
  footer?: {
    text?: string;
    link?: {
      href: string;
      text: string;
    };
  };
  core?: CoreOptions;
  mermaid?: object;
}

export async function start({
  mdFiles,
  header: headerOptions,
  footer: footerOptions,
  core,
  mermaid,
}: MdBookOptions): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  window.addEventListener("load", async () => {
    document.body.innerHTML = `<div id="initial-loading"><div class="rotate">md-book</div></div>`;

    await setHead({
      mdFiles,
      header: headerOptions,
      footer: footerOptions,
      core,
    });

    const pathObjects = [
      ...mdFiles.indexedPaths.map((path) => ({
        ...(typeof path === "object" ? path : { path }),
        indexed: true,
      })),
      ...mdFiles.hiddenPaths.map((path) => ({
        ...(typeof path === "object" ? path : { path }),
        indexed: false,
      })),
    ];

    const pageContents = await fetchPageContents(pathObjects, core);

    document.body.innerHTML = bodyHtml;
    const app = createApp({
      data: () => ({
        bookOptions: {
          mermaid,
        },
        pageContents,
        indexedPageContents: pageContents.filter(({ indexed }) => indexed),
      }),
    });
    app.use(router);
    app.mount("#app");

    const header = createApp({
      components: {
        VueHeader,
      },
      data: () => ({
        headerOptions,
      }),
    });
    header.use(router);
    header.mount("#header");

    const footer = createApp({
      components: {
        VueFooter,
      },
      data: () => ({
        footerOptions,
      }),
    });
    footer.mount("#footer");
  });
}
