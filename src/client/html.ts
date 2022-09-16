export const bodyHtml = `
<header id="header">
  <vue-header />
</header>
<main id="app" v-cloak>
  <router-view
    v-slot="{ Component }"
  >
    <transition name="fade">
      <component
        :is="Component"
        :page-contents="pageContents"
        :indexed-page-contents="indexedPageContents"
      ></component>
    </transition>
  </router-view>
</main>
<footer id="footer">
  <vue-footer />
</footer>
`;
