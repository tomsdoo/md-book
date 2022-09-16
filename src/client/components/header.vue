<template>
  <div class="header-content">
    <span>electronade</span>
    <form
      onsubmit="return false"
      v-on:submit="onSubmit"
      class="key-form"
    >
      <input id="keybox" v-model="state.keyword" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup(){
    const router = useRouter();
    const state = reactive({
      keyword: ""
    });

    const onSubmit = () => {
      if(!Boolean(state.keyword)){return;}

      router.push({
        name: "search",
        query: { keyword: state.keyword }
      });
      state.keyword = "";
    };
    return {
      state,
      onSubmit
    };
  }
});
</script>
