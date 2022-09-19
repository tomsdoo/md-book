<template>
  <section class="index main-padded" :class="[state.indexFolded && 'folded']">
    <ul
      class="index-list scroll-hidden"
      :class="[state.indexFolded && 'folded']"
    >
      <li
        v-for="(page, index) in indexedPageContents"
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
    <button v-on:click="toggleIndexFolded()" class="index-toggle-button">
      index
      <span v-if="state.indexFolded" class="material-icons-outlined icon">
        expand_more
      </span>
      <span v-else class="material-icons-outlined icon"> expand_less </span>
    </button>
  </section>
  <section class="content main-padded">
    <div class="article-wrapper scroll-hidden" ref="articleWrapper">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  props: {
    indexedPageContents: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const articleWrapper = ref(undefined);
    const state = reactive({
      indexFolded: false,
    });
    const toggleIndexFolded = () => {
      state.indexFolded = !state.indexFolded;
    };
    const scrollToTop = () => {
      articleWrapper.value.scrollTo(0, 0);
    };
    return {
      articleWrapper,
      scrollToTop,
      state,
      toggleIndexFolded,
    };
  },
});
</script>

<style scoped>
.main-padded {
  padding: 1rem;
}

.index {
  grid-area: index;
  height: 100%;
  overflow: hidden;
}

.index-list {
  height: 100%;
  overflow-y: auto;
  min-width: 10rem;
  max-width: 15rem;
}

.index-list > .item > .link {
  display: grid;
  grid-template: "icon text" max-content / max-content 1fr;
  grid-gap: 0.5em;
  align-items: start;
  padding: 0.4em 1em;
}
.index-list > .item > .link:hover {
  text-shadow: 0 0 0.5px;
}
.index-list > .item > .link > .icon {
  grid-area: icon;
  font-size: 1em;
  padding-top: 0.2em;
}
.index-list > .item > .link > .text {
  grid-area: text;
}

.index-toggle-button {
  position: relative;
  display: none;
  padding: 0.2em;
  width: 100%;
  height: 2rem;
  justify-content: center;
  align-items: center;
  background: var(--index-toggle-button-bg-color, #eeeeee);
}
.index-toggle-button > .icon {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
}

.content {
  grid-area: content;
  height: 100%;
  overflow: hidden;
}

.content > .article-wrapper {
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.content > .article-wrapper > .article {
  min-height: 100%;
}

@media screen and (max-width: 600px) {
  .index {
    max-height: 20vh;
    max-width: 100%;
  }
  .index.folded {
    padding-top: 0;
    padding-bottom: 0;
  }
  .index-list {
    transition: height 200ms;
    height: calc(100% - 2rem);
  }
  .index-list.folded {
    height: 0;
  }
  .index-toggle-button {
    display: grid;
  }
}
</style>
