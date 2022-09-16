<template>
  <section
    class="index main-padded"
    :class="[state.indexFolded && 'folded']"
  >
    <ul
      class="index-list scroll-hidden"
    >
      <li
        v-for="(page, index) in indexedPageContents"
        :key="index"
        class="item"
      >
        <router-link :to="{ name: 'article', query: { path: page.rawPath }}" class="link">
          <span class="material-icons-outlined icon">article</span>
          <span class="text">{{ page.title }}</span>
        </router-link>
      </li>
    </ul>
    <button v-on:click="toggleIndexFolded()" class="index-toggle-button">
      index
      <span v-if="state.indexFolded" class="material-icons-outlined icon">
        expand_more
      </span>
      <span v-else class="material-icons-outlined icon"> expand_less </span>
    </button>
  </section>
  <section class="content main-padded">
    <div class="article-wrapper scroll-hidden">
        <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  props: {
    indexedPageContents: {
      type: Array,
      default: () => []
    }
  },
  setup(){
    const state = reactive({});
    return {
      state
    };
  }
});
</script>
