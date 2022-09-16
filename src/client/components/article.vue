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
