<template>
  <div class="header-content">
    <router-link :to="{ name: 'article' }">
      {{ headerText }}
    </router-link>
    <form onsubmit="return false" v-on:submit="onSubmit" class="key-form">
      <input class="keybox" v-model="state.keyword" />
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      keyword: "",
    });
    const headerText = computed(() => props.options?.title ?? "untitled");

    watch(
      () => route?.query?.keyword,
      (to) => {
        // @ts-expect-error
        state.keyword = to ?? "";
      }
    );

    const onSubmit = () => {
      if (!state.keyword) {
        return;
      }

      router.push({
        name: "search",
        query: { keyword: state.keyword },
      });
    };
    return {
      state,
      headerText,
      onSubmit,
    };
  },
});
</script>

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
