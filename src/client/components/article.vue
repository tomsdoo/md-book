<template>
  <vue-layout :indexed-page-contents="indexedPageContents">
    <article
      v-if="state.currentPage"
      v-html="state.currentPage.html"
      id="article"
      class="article"
    ></article>
  </vue-layout>
</template>

<script lang="ts">
import VueLayout from "./layout.vue";
import { computed, defineComponent, nextTick, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import hljs from "highlight.js";

export default defineComponent({
  components: {
    VueLayout
  },
  props: {
    pageContents: {
      type: Array,
      default: () => []
    },
    indexedPageContents: {
      type: Array,
      default: () => []
    }
  },
  setup(props){
    const state = reactive({
      currentPage: undefined
    });
    const route = useRoute();
    watch(
      () => route?.query?.path,
      (to) => {
        state.currentPage = props.pageContents
          .find(({ rawPath }) => rawPath === to)
          ?? props.indexedPageContents[0];
      },
      { immediate: true }
    );
    watch(
      () => state?.currentPage,
      (to) => {
        nextTick(() => {
          hljs.highlightAll();
        });
      },
      { immediate: true }
    );
    return {
      state
    };
  }
});
</script>

<style>
#article h1:not(:first-child),
#article h2:not(:first-child),
#article h3:not(:first-child),
#article h4:not(:first-child),
#article h5:not(:first-child),
#article h6:not(:first-child) {
  margin: 1rem 0 0.5rem;
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
  color: #439cff;
}
#article a:hover {
  text-shadow: 0 0 0.5px;
}

#article strong {
  text-shadow: 0 0 0.5px;
}

#article hr {
  opacity: 0.5;
  margin: 1rem 0;
}

#article code:not(.hljs) {
  padding: 0 0.5em;
  background: #eeeeee;
}

#article blockquote {
  padding: 0.5em 1em;
  border-left: 5px solid #cccccc;
  margin: 0.5em 0;
}

#article > pre {
  margin: 0.5em 0;
}

#article ol {
  margin: 0.5em 0;
  list-style-type: decimal;
  list-style-position: outside;
  padding-left: 1.2em;
}

#article ul {
  margin: 0.5em 0;
  list-style-type: disc;
  list-style-position: outside;
  padding-left: 1.2em;
}

#article table {
  margin: 0.5em 0;
  border-collapse: collapse;
}
#article table th,
#article table td {
  border: 1px solid #aaaaaa;
  padding: 0.2em 0.5em;
}

/* mermaid.js */
#article > pre > code.language-mermaid {
  display: none;
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