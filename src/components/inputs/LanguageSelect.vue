<template>
  <b-select
    :value="value"
    expanded
    @input="$emit('input', $event)">
    <option :value="null">-</option>
    <option
      v-for="[language, label] in languages"
      :value="language"
      :key="language">{{ label }}</option>
  </b-select>
</template>

<script>
import { LANGUAGES } from '@/utils';


export default {
  name: 'LanguageSelect',
  props: {
    value: {
      type: String,
      default: null,
    },
    exclude: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    languages() {
      return Object.keys(LANGUAGES)
        .map(lang => ([lang, LANGUAGES[lang]]))
        .filter(([lang]) => !this.exclude.includes(lang));
    },
  },
};
</script>
