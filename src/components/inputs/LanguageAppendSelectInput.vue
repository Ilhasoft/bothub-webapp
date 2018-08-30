<template>
  <bh-dropdown class="example-txt-w-highlighted-entities__input__language">
    <span
      slot="trigger"
      class="clickable">
      <bh-language-flag
        v-if="val"
        :language="val" />
      <bh-icon
        v-else
        value="earth" />
      <bh-icon value="menu-down" />
    </span>
    <bh-dropdown-item
      v-for="(verbose, language) in LANGUAGES"
      :key="language"
      @click="setVal(language)">
      <bh-language-flag
        :language="language"
        size="small" />
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
