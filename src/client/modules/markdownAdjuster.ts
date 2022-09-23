import { nextTick } from "vue";

function applyMermaid(): void {
  document
    .querySelectorAll("#article pre code.language-mermaid")
    .forEach((codeTag) => {
      const container = codeTag.parentNode;
      if (container.classList.contains("language-mermaid") as boolean) {
        return;
      }
      container.classList.add("language-mermaid");
      const div = container.appendChild(document.createElement("div"));
      div.innerHTML = codeTag.innerHTML;
      div.classList.add("mermaid");
    });
  nextTick(() => {
    // eslint-disable-next-line no-undef
    mermaid.init();
  })
    .then(() => {})
    .catch(() => {});
}

async function waitMs(ms): Promise<any> {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

function applyCopyable(): void {
  document.querySelectorAll("#article pre code.hljs").forEach((codeTag) => {
    const container = codeTag.parentNode;
    if (container.classList.contains("copyable") as boolean) {
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
        .writeText(codeTag.textContent)
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
  document
    .querySelectorAll("#article li input[type='checkbox']")
    .forEach((inputTag) => {
      const listItemTag = inputTag.parentNode;
      const listTag = listItemTag.parentNode;

      if (listTag.classList.contains("check-list") as boolean) {
        return;
      }
      listTag.classList.add("check-list");
    });
}

function wrapTable(): void {
  document.querySelectorAll("#article table").forEach((tableTag) => {
    if (!(tableTag.parentNode.classList.contains("table-wrapper") as boolean)) {
      tableTag.outerHTML = `<div class="table-wrapper scroll-hidden">${tableTag.outerHTML}</div>`;
    }
  });
}

function replaceUrl(originalPath, currentUrl): string {
  if (originalPath.match(/^http/i) as boolean) {
    return originalPath;
  }
  const replacedUrl = new URL(originalPath, currentUrl);
  return replacedUrl.origin + replacedUrl.pathname;
}

function adjustLinks(currentPage): void {
  document.querySelectorAll("article a").forEach((anchorTag) => {
    const hyperReference = anchorTag.getAttribute("href");
    const replacedUrl = replaceUrl(hyperReference, currentPage.url);
    if (hyperReference === replacedUrl) {
      return;
    }
    anchorTag.setAttribute("href", `#/?path=${replacedUrl}`);
  });
}

function adjustImagePaths(currentPage): void {
  document.querySelectorAll("#article img").forEach((imageTag) => {
    const src = imageTag.getAttribute("src");
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
