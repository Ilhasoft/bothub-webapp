<template>
  <bh-dropdown class="example-txt-w-highlighted-entities__input__language">
    <span
      slot="trigger"
      class="clickable">
      <bh-language-flag v-if="val" :language="val" />
      <bh-icon value="earth" v-else />
      <bh-icon value="menu-down" />
    </span>
    <bh-dropdown-item
      v-for="(verbose, language) in LANGUAGES"
      :key="language"
      @click="setVal(language)">
      <bh-language-flag
        size="small"
        :language="language" />
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
      props: String,
      default: null,
    },
  },
  watch: {
    val(value) {
      this.$emit('input', value);
    },
  },
  data() {
    return {
      val: this.value,
      LANGUAGES,
    };
  },
  methods: {
    setVal(value) {
      this.val = value;
    },
  },
};
</script>
