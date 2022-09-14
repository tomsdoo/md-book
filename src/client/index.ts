import { createApp } from "vue";
import { bodyHtml } from "./html";

type MdFiles = {
  indexedPaths: string[];
  hiddenPaths: string[];
};

export function start(mdFiles: MdFiles){
  console.log(mdFiles);
  window.addEventListener("load", () => {
    document.body.innerHTML = bodyHtml;
    const app = createApp({});
    app.mount("#app");
  });
}
