<template>
  <bh-modal :open.sync="openValue">
    <div class="bh-grid">
      <div class="bh-grid__item">
        <h2>Warnings</h2>
        <div
          v-for="(warnings, lang) in languagesWarnings"
          :key="lang">
          <div><strong>{{ lang | languageVerbose }}</strong></div>
          <div
            v-for="(warning, index) in warnings"
            :key="index">{{ warning }}</div>
        </div>
      </div>
    </div>
  </bh-modal>
</template>

<script>
export default {
  name: 'WarningModal',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    languagesWarnings: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      openValue: this.open,
    };
  },
  watch: {
    open(value) {
      this.openValue = value;
    },
    openValue(value) {
      this.$emit('update:open', value);
    },
  },
};
</script>
