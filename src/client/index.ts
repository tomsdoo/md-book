import { createApp } from "vue";
import { bodyHtml } from "./html";

import VueHeader from "./components/header.vue";
import VueFooter from "./components/footer.vue";

import { router } from "./router/";

import * as marked from "marked";

import "destyle.css";
import "highlight.js/styles/stackoverflow-light.css";
import "./css/style.css";
import "./css/cloak.css";
import "./css/fade.css";

type MdFiles = {
  indexedPaths: string[];
  hiddenPaths: string[];
};

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
    }
  }
}

function setHead({ header }: MdBookOptions){
  const createTag = (name: string, attributes?: object) => {
    const ele = document.createElement(name);
    Object.entries(attributes ?? {}).forEach(([ key, value ]) => {
      ele.setAttribute(key, value);
    });
    return ele;
  };

  const headTag = document.getElementsByTagName("head")[0];
  if(!document.querySelector("head meta[charset]")){
    headTag.appendChild(createTag("meta", { charset: "UTF-8" }));
  }

  if(!document.querySelector("head title")){
    headTag.appendChild(createTag("title")).innerHTML = header?.title ?? "untitled";
  }

  if(!document.querySelector("head meta[name='viewport']")){
    headTag.appendChild(createTag("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }));
  }

  if(!document.querySelector("head meta[name='description']")){
    headTag.appendChild(createTag("meta", {
      name: "description",
      content: "@tomsd/md-book helps you ad hoc web book making."
    }));
  }

  headTag.appendChild(createTag("script", {
    src: "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js",
    async: "",
    defer: ""
  }));

}

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

export async function start({ mdFiles, header: headerOptions, footer: footerOptions }: MdBookOptions){
  console.log(mdFiles);

  window.addEventListener("load", async () => {
    setHead({ mdFiles, header: headerOptions, footer: footerOptions });

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
      },
      data: () => ({
        headerOptions
      })
    });
    header.use(router);
    header.mount("#header");

    const footer = createApp({
      components: {
        VueFooter
      },
      data: () => ({
        footerOptions
      })
    });
    footer.mount("#footer");
  });
}
