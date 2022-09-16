<template>
  <vue-layout :indexed-page-contents="indexedPageContents">
    <div class="search-result">
      <h1 class="title">
        "{{ keyword }}": searchResultPages.length
      </h1>
      <ul class="list">
        <li
          v-for="(page, index) in searchResultPages"
          :key="index"
          class="item"
        >
          <router-link
            :to="{ name: 'article', query: { path: page.rawPath } }"
            class="link"
          >
            <span class="material-icons-outlined icon">article</span>
            <span class="text">{{ page.title }}</span>
          </router-link>
        </li>
      </ul>
      search result {{ route.query }}
    </div>
  </vue-layout>
</template>

<script lang="ts">
import VueLayout from "./layout.vue";
import { computed, defineComponent, SetupContext } from "vue";
import { useRoute } from "vue-router";

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
    const route = useRoute();
    const keyword = computed(() => route.query.keyword);
    console.log(keyword);
    const searchResultPages = computed(() => {
      const keyl = route.query.keyword.split(" ");
      return props.pageContents
        .filter(({ text }) => keyl.every(keye => text.match(new RegExp(keye, "i"))));
    });
    return {
      route,
      keyword,
      searchResultPages
    };
  }
});
</script>
