<template>
  <bh-dropdown class="language-append-select-input">
    <span
      slot="trigger"
      class="clickable bh-grid language-append-select-input__language-select">
      <language-badge
        v-if="val"
        :language="val" />
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
import LanguageBadge from '@/components/shared/LanguageBadge';


export default {
  name: 'LanguageAppendSelectInput',
  components: {
    LanguageBadge,
  },
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
