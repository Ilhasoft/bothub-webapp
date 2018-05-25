<template>
  <b-select
    expanded
    @input="$emit('input', $event)"
    :value="value">
    <option :value="null">-</option>
    <option
      v-for="(label, language) in languages"
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
    },
  },
  data() {
    return {
      languages: LANGUAGES,
    };
  },
};
</script>

