import { nextTick } from "vue";

function applyMermaid(): void {
  globalThis.document
    .querySelectorAll("#article pre code.language-mermaid")
    .forEach((codeTag) => {
      const container = codeTag.parentNode as HTMLElement;
      if (container.classList.contains("language-mermaid")) {
        return;
      }
      container.classList.add("language-mermaid");
      const div = container.appendChild(document.createElement("div"));
      div.innerHTML = codeTag.innerHTML;
      div.classList.add("mermaid");
    });
  nextTick(() => {
    // eslint-disable-next-line no-undef
    globalThis.mermaid.init();
  })
    .then(() => {})
    .catch(() => {});
}

async function waitMs(ms: number): Promise<any> {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

function applyCopyable(): void {
  globalThis.document
    .querySelectorAll("#article pre code.hljs")
    .forEach((codeTag) => {
      const container = codeTag.parentNode as HTMLElement;
      if (container.classList.contains("copyable")) {
        return;
      }
      container.classList.add("copyable");
      const button = container.appendChild(document.createElement("button"));
      button.classList.add("copy-button");
      const iconTag = button.appendChild(document.createElement("span"));
      iconTag.classList.add("material-icons", "icon");
      iconTag.innerHTML = "content_copy";
      button.addEventListener("click", () => {
        navigator.clipboard
          .writeText(codeTag.textContent as string)
          .then(async () => {
            iconTag.innerHTML = "done";
            return await waitMs(1000);
          })
          .then(() => {
            iconTag.innerHTML = "content_copy";
          })
          .catch(() => {});
      });
    });
}

function adjustCheckboxes(): void {
  globalThis.document
    .querySelectorAll("#article li input[type='checkbox']")
    .forEach((inputTag) => {
      const listItemTag = (inputTag as HTMLElement).parentNode as HTMLElement;
      const listTag = listItemTag.parentNode as HTMLElement;

      if (listTag.classList.contains("check-list")) {
        return;
      }
      listTag.classList.add("check-list");
    });
}

function wrapTable(): void {
  globalThis.document.querySelectorAll("#article table").forEach((tableTag) => {
    if (
      !(tableTag.parentNode as HTMLElement).classList.contains("table-wrapper")
    ) {
      tableTag.outerHTML = `<div class="table-wrapper scroll-hidden">${tableTag.outerHTML}</div>`;
    }
  });
}

function replaceUrl(originalPath: string, currentUrl: string): string {
  if (originalPath.match(/^http/i) !== null) {
    return originalPath;
  }
  const replacedUrl = new URL(originalPath, currentUrl);
  return replacedUrl.origin + replacedUrl.pathname;
}

function adjustLinks(currentPage: { url: string }): void {
  globalThis.document.querySelectorAll("#article a").forEach((anchorTag) => {
    const hyperReference = anchorTag.getAttribute("href") as string;
    const replacedUrl = replaceUrl(hyperReference, currentPage.url);
    if (hyperReference === replacedUrl) {
      return;
    }
    anchorTag.setAttribute("href", `#/?path=${replacedUrl}`);
  });
}

function adjustImagePaths(currentPage: { url: string }): void {
  globalThis.document.querySelectorAll("#article img").forEach((imageTag) => {
    const src = imageTag.getAttribute("src") as string;
    const replacedSrc = replaceUrl(src, currentPage.url);
    if (src === replacedSrc) {
      return;
    }
    imageTag.setAttribute("src", replacedSrc);
  });
}

export const markdownAdjuster = {
  applyMermaid,
  applyCopyable,
  adjustCheckboxes,
  wrapTable,
  adjustLinks,
  adjustImagePaths,
};
