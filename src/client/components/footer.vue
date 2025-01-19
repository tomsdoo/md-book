<script setup lang="ts">
import type { MdBookOptions } from "@/client/";
import { computed } from "vue";

const props = defineProps<{
  options?: MdBookOptions["footer"];
}>();

const _link = computed(
  () =>
    props.options?.link ??
    (props.options?.text === undefined && {
      href: "https://www.npmjs.com/package/@tomsd/md-book",
      text: "@tomsd/md-book",
    }),
);

const _footerText = computed(
  () =>
    props.options?.text ?? (props.options?.link === undefined && "powered by "),
);
</script>

<template>
  <div class="footer-content">
    <span v-if="_footerText" class="footer-text">
      {{ _footerText }}
    </span>
    <a v-if="_link" :href="_link.href" class="footer-link" target="_blank">
      <span class="text">{{ _link.text }}</span>
      <span class="material-icons icon">open_in_new</span>
    </a>
  </div>
</template>

<style scoped>
.footer-content {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}

.footer-text {
  font-size: 1em;
}

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
