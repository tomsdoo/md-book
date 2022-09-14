export const bodyHtml = `
<header id="header">
  <router-view name="header" />
</header>
<main id="app" v-cloak>
  <section
    class="index main-padded"
    :class="[state.indexFolded && 'folded']"
  >
    <ul
      class="index-list scroll-hidden"
      :class="[state.indexFolded && 'folded']"
    >
      <li
        v-for="(page, index) in indexedPageContents"
        :key="index"
        class="item"
      >
        <a :href="'#'+page.hashPath" class="link">
          <span class="material-icons-outlined icon">article</span>
          <span class="text">{{ page.title }}</span>
        </a>
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
      <transition name="fade">
        <article
          v-if="state.currentPage"
          v-html="state.currentPage.html"
          id="article"
          class="article"
        ></article>
      </transition>
      <transition name="fade">
        <div v-if="state.searchResult" class="search-result">
          <h1 class="title">
            "{{ state.searchResult.keyword }}": {{
            state.searchResult.pages.length }}
          </h1>
          <ul class="list">
            <li
              v-for="(page, index) in state.searchResult.pages"
              :key="index"
              class="item"
            >
              <a :href="'#'+page.hashPath" class="link">
                <span class="material-icons-outlined icon">article</span>
                <span class="text">{{ page.title }}</span>
              </a>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </section>
</main>
<footer id="footer">
  <a
    href="https://www.npmjs.com/package/electronade"
    class="footer-link"
    target="_blank"
  >
    <span class="text">npm electronade</span>
    <span class="material-icons icon">open_in_new</span>
  </a>
</footer>
`;
