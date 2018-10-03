<template>
  <bh-card>
    <div class="bh-grid">
      <div class="bh-grid__item">
        <div :is="component" />
        <div class="example__code">
          <bh-button
            primary
            full-width
            class="example__code__trigger"
            @click="toggleCodeOpen()">
            <bh-icon value="code-tags" />
            <span v-show="!codeOpen">Open Code</span>
            <span v-show="codeOpen">Close Code</span>
          </bh-button>
          <div
            v-show="codeOpen"
            class="example__code__content">
            <pre v-highlightjs="code"><code :class="codeClass" /></pre>
          </div>
        </div>
      </div>
    </div>
  </bh-card>
</template>

<script>
export default {
  name: 'Example',
  props: {
    component: {
      type: Object,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    codeClass: {
      type: String,
      default: 'html',
    },
  },
  data() {
    return {
      codeOpen: false,
    };
  },
  methods: {
    toggleCodeOpen() {
      this.codeOpen = !this.codeOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.example {
  &__code {
    margin: 1rem 0;

    &__trigger {}
    &__content {}
  }
}
</style>
