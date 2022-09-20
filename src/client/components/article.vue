<template>
  <vue-layout :indexed-page-contents="indexedPageContents" ref="layout">
    <transition name="fade">
      <article
        v-show="state.ready && state.currentPage"
        v-html="state.currentPage.html"
        id="article"
        class="article"
      ></article>
    </transition>
  </vue-layout>
</template>

<script lang="ts">
import VueLayout from "./layout.vue";
import { defineComponent, nextTick, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import hljs from "highlight.js";
import { fetchPageContent } from "../modules/";

function applyMermaid() {
  document
    .querySelectorAll("#article pre code.language-mermaid")
    .forEach((codeTag) => {
      const container = codeTag.parentNode;
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
    mermaid.init();
  });
}

function waitMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function applyCopyable() {
  document.querySelectorAll("#article pre code.hljs").forEach((codeTag) => {
    const container = codeTag.parentNode;
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
        .writeText(codeTag.textContent)
        .then(() => {
          iconTag.innerHTML = "done";
          return waitMs(1000);
        })
        .then(() => {
          iconTag.innerHTML = "content_copy";
        });
    });
  });
}

function adjustCheckboxes() {
  document
    .querySelectorAll("#article li input[type='checkbox']")
    .forEach((inputTag) => {
      const listItemTag = inputTag.parentNode;
      const listTag = listItemTag.parentNode;

      if (listTag.classList.contains("check-list")) {
        return;
      }
      listTag.classList.add("check-list");
    });
}

function wrapTable() {
  document.querySelectorAll("#article table").forEach((tableTag) => {
    if (!tableTag.parentNode.classList.contains("table-wrapper")) {
      tableTag.outerHTML = `<div class="table-wrapper scroll-hidden">${tableTag.outerHTML}</div>`;
    }
  });
}

function replaceUrl(originalPath, currentUrl) {
  if (originalPath.match(/^http/i)) {
    return originalPath;
  }
  const replacedUrl = new URL(originalPath, currentUrl);
  return replacedUrl.origin + replacedUrl.pathname;
}

function adjustLinks(currentPage) {
  document.querySelectorAll("article a").forEach((anchorTag) => {
    const hyperReference = anchorTag.getAttribute("href");
    const replacedUrl = replaceUrl(hyperReference, currentPage.url);
    if (hyperReference === replacedUrl) {
      return;
    }
    anchorTag.setAttribute("href", `#/?path=${replacedUrl}`);
  });
}

function adjustImagePaths(currentPage) {
  document.querySelectorAll("#article img").forEach((imageTag) => {
    const src = imageTag.getAttribute("src");
    const replacedSrc = replaceUrl(src, currentPage.url);
    if (src === replacedSrc) {
      return;
    }
    imageTag.setAttribute("src", replacedSrc);
  });
}

export default defineComponent({
  components: {
    VueLayout,
  },
  props: {
    pageContents: {
      type: Array,
      default: () => [],
    },
    indexedPageContents: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const layout = ref(undefined);
    const state = reactive({
      currentPage: undefined,
      ready: false,
    });
    const route = useRoute();
    watch(
      () => route?.query?.path,
      async (to) => {
        state.ready = false;
        state.currentPage =
          to === undefined
            ? props.indexedPageContents[0]
            : props.pageContents.find(({ url }) => url === to) ??
              (await fetchPageContent({ path: to, indexed: false }).then(
                (page) => (page.status !== 200 ? undefined : page)
              )) ??
              props.indexedPageContents[0];

        nextTick(() => {
          state.ready = true;
        });
      },
      { immediate: true }
    );
    watch(
      () => state?.currentPage,
      (to) => {
        nextTick(() => {
          hljs.highlightAll();
          applyMermaid();
          applyCopyable();
          adjustCheckboxes();
          wrapTable();
          adjustLinks(state.currentPage);
          adjustImagePaths(state.currentPage);
          layout?.value?.scrollToTop();
        });
      },
      { immediate: true }
    );
    return {
      layout,
      state,
    };
  },
});
</script>

<style>
#article h1:not(:first-child),
#article h2:not(:first-child),
#article h3:not(:first-child),
#article h4:not(:first-child),
#article h5:not(:first-child),
#article h6:not(:first-child) {
  margin: 2rem 0 0.5rem;
}

#article h1 {
  font-size: 24px;
}

#article h2 {
  font-size: 22px;
}

#article h3 {
  font-size: 20px;
}

#article h4,
#article h5,
#article h6 {
  font-size: 18px;
}

#article p {
  line-height: 1.2;
  margin: 0.5em 0;
}

#article a {
  color: var(--markdown-anchor-color, #439cff);
}
#article a:hover {
  text-shadow: 0 0 0.5px;
}

#article strong {
  text-shadow: 0 0 0.5px;
}

#article img {
  max-width: 100%;
}

#article hr {
  opacity: 0.5;
  margin: 1rem 0;
}

#article code:not(.hljs) {
  padding: 0 0.5em;
  background: var(--markdown-inline-code-color, #eeeeee);
}

#article blockquote {
  padding: 0.5em 1em;
  border-left: 5px solid var(--markdown-quote-border-color, #cccccc);
  margin: 0.5em 0;
}

#article > pre {
  margin: 0.5em 0;
}

#article ol,
#article ul {
  margin: 0.5em 0;
  list-style-position: outside;
  padding-left: 1.2em;
}

#article ol:not(.check-list) {
  list-style-type: decimal;
}

#article ul:not(.check-list) {
  list-style-type: disc;
}

#article table {
  margin: 0.5em 0;
  border-collapse: collapse;
}
#article table th,
#article table td {
  border: 1px solid var(--markdown-table-border-color, #aaaaaa);
  padding: 0.2em 0.5em;
}

/* table */
#article > div.table-wrapper {
  overflow: auto;
}

/* mermaid.js */
#article > pre > code.language-mermaid {
  display: none;
}
#article > pre > div.mermaid > svg {
  max-width: 100%;
}

/* code copy button */
#article > pre.copyable {
  position: relative;
}
#article > pre.copyable > .copy-button {
  position: absolute;
  top: 1em;
  right: 0.5em;
}
#article > pre.copyable > .copy-button:hover {
  text-shadow: 0 0 0.5px;
}
#article > pre.copyable > .copy-button > .icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}
</style>
