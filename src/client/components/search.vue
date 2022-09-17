<template>
  <vue-layout :indexed-page-contents="indexedPageContents">
    <transition name="fade">
      <div v-if="state.ready" class="search-result">
        <h1 class="title">
          "{{ keyword }}": {{ searchResultPages.length }}
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
      </div>
    </transition>
  </vue-layout>
</template>

<script lang="ts">
import VueLayout from "./layout.vue";
import { computed, defineComponent, nextTick, reactive, SetupContext } from "vue";
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
    const state = reactive({
      ready: false
    });
    const route = useRoute();
    const keyword = computed(() => route.query.keyword);

    const searchResultPages = computed(() => {
      const keyl = route.query.keyword.split(" ");
      return props.pageContents
        .filter(({ text }) => keyl.every(keye => text.match(new RegExp(keye, "i"))));
    });
    nextTick(() => {
      state.ready = true;
    });
    return {
      state,
      keyword,
      searchResultPages
    };
  }
});
</script>

<style scoped>
.search-result {
  display: grid;
  grid-gap: 1rem;
}

.search-result > .title {
  font-size: 20px;
}

.search-result > .list {
  display: grid;
  grid-gap: 0.5rem;
}

.search-result > .list > .item {
}

.search-result > .list > .item > .link {
  display: grid;
  grid-template: "icon text" max-content / max-content max-content;
  grid-gap: 0.5em;
  align-items: start;
  color: var(--search-anchor-color, #439cff);
  width: max-content;
}
.search-result > .list > .item > .link:hover {
  text-shadow: 0 0 0.5px;
}

.search-result > .list > .item > .link > .icon {
  font-size: inherit;
  width: 1em;
  height: 1em;
  padding-top: 0.2em;
}
</style>
