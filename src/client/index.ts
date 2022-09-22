import "destyle.css";
import "highlight.js/styles/stackoverflow-light.css";
import "./css/style.css";
import "./css/cloak.css";
import "./css/fade.css";

import { createApp } from "vue";
import { bodyHtml } from "./html";

import VueHeader from "./components/header.vue";
import VueFooter from "./components/footer.vue";

import { router } from "./router/";

import { fetchPageContents, FetchPageContentOptions } from "./modules/";

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
}

async function setHead({ header }: MdBookOptions): Promise<any> {
  const createTag = (name: string, attributes?: object): HTMLElement => {
    const ele = document.createElement(name);
    Object.entries(attributes ?? {}).forEach(([key, value]) => {
      ele.setAttribute(key, value);
    });
    return ele;
  };

  return await new Promise((resolve) => {
    const headTag = document.getElementsByTagName("head")[0];
    if (document.querySelector("head meta[charset]") == null) {
      headTag.appendChild(createTag("meta", { charset: "UTF-8" }));
    }

    if (document.querySelector("head title") == null) {
      headTag.appendChild(createTag("title")).innerHTML =
        header?.title ?? "untitled";
    }

    if (document.querySelector("head meta[name='viewport']") == null) {
      headTag.appendChild(
        createTag("meta", {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        })
      );
    }

    if (document.querySelector("head meta[name='description']") == null) {
      headTag.appendChild(
        createTag("meta", {
          name: "description",
          content: "@tomsd/md-book helps you ad hoc web book making.",
        })
      );
    }

    headTag.appendChild(
      createTag("script", {
        src: "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js",
      })
    ).onload = () => resolve(undefined);
  });
}

export async function start({
  mdFiles,
  header: headerOptions,
  footer: footerOptions,
  core,
}: MdBookOptions): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  window.addEventListener("load", async () => {
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
