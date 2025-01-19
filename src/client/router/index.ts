import VueArticle from "@/client/components/article.vue";
import VueSearch from "@/client/components/search.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "article",
    components: {
      default: VueArticle,
    },
  },
  {
    path: "/search",
    name: "search",
    components: {
      default: VueSearch,
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
