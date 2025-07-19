import "destyle.css";
import "highlight.js/styles/stackoverflow-light.css";
import "./css/style.css";
import "./css/cloak.css";
import "./css/fade.css";
import "./css/initial-loading.css";
import "./css/github-token-area.css";

import { createApp } from "vue";
import VueFooter from "./components/footer.vue";
import VueHeader from "./components/header.vue";
import { bodyHtml } from "./html";
import {
  FetchPageContentOptions,
  fetchPageContents,
  getGithubTokens,
  PathInterpreter,
  setHead,
} from "./modules/";
import { router } from "./router/";

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
  window.addEventListener("load", async () => {
    document.body.innerHTML = `<div id="initial-loading"><div class="rotate">md-book</div></div>`;

    await setHead({
      header: headerOptions,
    });

    const pathObjects = [
      ...mdFiles.indexedPaths.map((path) => ({
        type: "plain",
        ...(typeof path === "object" ? path : new PathInterpreter(path).result),
        indexed: true,
      })),
      ...mdFiles.hiddenPaths.map((path) => ({
        type: "plain",
        ...(typeof path === "object" ? path : new PathInterpreter(path).result),
        indexed: false,
      })),
    ];

    const tokens = await getGithubTokens(
      pathObjects
        .filter(({ type }) => type === "github")
        .map(({ owner, repo }: any) => ({ owner, repo })),
    );
    sessionStorage.githubTokens = JSON.stringify(tokens);

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
