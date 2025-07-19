<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { MdBookOptions } from "@/client/";

const props = defineProps<{
  options?: MdBookOptions["header"];
}>();

const route = useRoute();
const router = useRouter();

const keyword = ref("");

// biome-ignore lint/correctness/noUnusedVariables: template html uses it
const headerText = computed(() => props.options?.title ?? "untitled");

watchEffect(() => {
  const [queryKeyword] = Array.isArray(route.query.keyword)
    ? route.query.keyword
    : [route.query.keyword];
  keyword.value = queryKeyword ?? "";
});

// biome-ignore lint/correctness/noUnusedVariables: template html calls it
function onSubmit() {
  if (keyword.value === "") {
    return;
  }

  router.push({
    name: "search",
    query: { keyword: keyword.value },
  });
}
</script>

<template>
  <div class="header-content">
    <router-link :to="{ name: 'article' }">
      {{ headerText }}
    </router-link>
    <form onsubmit="return false" v-on:submit="onSubmit" class="key-form">
      <input class="keybox" v-model="keyword" />
    </form>
  </div>
</template>

<style scoped>
.header-content {
  position: relative;
  display: grid;
  justify-content: center;
  align-items: center;
  width: min(1100px, calc(100vw - 2rem));
  margin: 0 auto;
  height: 100%;
}

.header-content > .key-form {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: grid;
  justify-content: end;
  align-items: center;
  width: 10rem;
}

.header-content > .key-form > .keybox {
  width: 100%;
  border-radius: 0.5em;
  box-shadow: 0 0 1px;
  padding: 0.2em 0.5em;
}

@media screen and (max-width: 600px) {
  .header-content > .key-form {
    width: 5rem;
  }
}
</style>
