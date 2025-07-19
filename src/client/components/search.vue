<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import VueLayout from "@/client/components/layout.vue";
import { PageContent } from "@/client/modules/types";

const props = defineProps<{
  pageContents: PageContent[];
  indexedPageContents: PageContent[];
}>();

const ready = ref(false);

const route = useRoute();
const keyword = computed(() => {
  const [keyword] = Array.isArray(route.query.keyword)
    ? route.query.keyword
    : [route.query.keyword];
  return keyword ?? "";
});

// biome-ignore lint/correctness/noUnusedVariables: template uses it
const searchResultPages = computed(() => {
  const keyl = keyword.value.split(" ");
  return props.pageContents.filter(({ text }) =>
    keyl.every((keye) => text.match(new RegExp(keye, "i"))),
  );
});

onMounted(() => {
  nextTick(() => {
    ready.value = true;
  });
});
</script>

<template>
  <vue-layout :indexed-page-contents="indexedPageContents">
    <transition name="fade">
      <div v-if="ready" class="search-result">
        <h1 class="title">"{{ keyword }}": {{ searchResultPages.length }}</h1>
        <ul class="list">
          <li
            v-for="(page, index) in searchResultPages"
            :key="index"
            class="item"
          >
            <router-link
              :to="{ name: 'article', query: { path: page.url } }"
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
  font-size: 1em;
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
