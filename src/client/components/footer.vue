<template>
  <div class="footer-content">
    <span v-if="footerText" class="footer-text">
      {{ footerText }}
    </span>
    <a
      v-if="link"
      :href="link.href"
      class="footer-link"
      target="_blank"
    >
      <span class="text">{{ link.text }}</span>
      <span class="material-icons icon">open_in_new</span>
    </a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props){
    const link = computed(() =>
      props.options?.link ??
      (props.options?.text === undefined && {
        href: "https://www.npmjs.com/package/@tomsd/md-book",
        text: "@tomsd/md-book"
      })
    );
    const footerText = computed(() =>
      props.options?.text ??
      (props.options?.link === undefined && "powered by ")
    );
    return {
      link,
      footerText
    };
  }
});
</script>

<style scoped>
.footer-content {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}

.footer-text {

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
