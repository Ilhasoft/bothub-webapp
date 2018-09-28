<template>
  <bh-icon
    :value="iconValue"
    v-bind="$attrs" />
</template>

<script>
const languageCountryFlagDict = {
  en: 'flag-us',
  de: 'flag-de',
  es: 'flag-es',
  pt: 'flag-pt',
  fr: 'flag-fr',
  it: 'flag-it',
  nl: 'flag-nl',
  pt_br: 'flag-br',
  id: 'flag-id',
  mn: 'flag-mn',
};

export default {
  name: 'BhLanguageFlag',
  props: {
    language: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconValue() {
      return languageCountryFlagDict[this.language];
    },
  },
};
</script>
