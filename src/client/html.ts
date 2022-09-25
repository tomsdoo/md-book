export const bodyHtml = `
<header id="header">
  <vue-header :options="headerOptions" />
</header>
<main id="app" v-cloak>
  <router-view
    v-slot="{ Component }"
  >
    <transition name="fade">
      <component
        :is="Component"
        :book-options="bookOptions"
        :page-contents="pageContents"
        :indexed-page-contents="indexedPageContents"
      ></component>
    </transition>
  </router-view>
</main>
<footer id="footer">
  <vue-footer :options="footerOptions" />
</footer>
`;
