<template>
  <bh-dropdown class="language-append-select-input">
    <span
      slot="trigger"
      class="clickable bh-grid language-append-select-input__language-select">
      <bh-language-flag
        v-if="val"
        :language="val"
        size="small" />
      <bh-icon
        v-else
        value="earth" />
      <bh-icon
        class="align"
        value="menu-down" />
    </span>
    <bh-dropdown-item
      v-for="(verbose, language) in LANGUAGES"
      :key="language"
      @click="setVal(language)">
      <span>{{ verbose }}</span>
    </bh-dropdown-item>
  </bh-dropdown>
</template>

<script>
import { LANGUAGES } from '@/utils';


export default {
  name: 'LanguageAppendSelectInput',
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      val: this.value,
      LANGUAGES,
    };
  },
  watch: {
    value(value) {
      this.val = value;
    },
    val(value) {
      this.$emit('input', value);
    },
  },
  methods: {
    setVal(value) {
      this.val = value;
    },
  },
};
</script>

<style lang="scss">
.language-append-select-input {
  &__language-select {
    align-items: center;
  }
}
</style>
