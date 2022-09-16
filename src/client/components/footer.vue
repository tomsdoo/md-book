<template>
  <a
    href="https://www.npmjs.com/package/electronade"
    class="footer-link"
    target="_blank"
  >
    <span class="text">npm electronade</span>
    <span class="material-icons icon">open_in_new</span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.footer-link {
  display: grid;
  grid-template: "text icon" max-content / max-content max-content;
  align-items: center;
}
.footer-link > .text {
  grid-area: text;
}
.footer-link > .icon {
  grid-area: icon;
  font-size: 1em;
}
</style>
