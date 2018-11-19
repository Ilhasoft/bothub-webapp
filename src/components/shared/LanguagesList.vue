<template>
  <div>
    <div class="bh-grid categories-list">
      <div class="bh-grid__item bh-grid__item--nested text-right">
        <bh-dropdown
          :title="dropdownTitle"
          position="left">
          <bh-dropdown-item
            v-for="language in languages"
            :key="language.id"
            @click="select(language.id, language.value)">{{ language.title }}</bh-dropdown-item>
        </bh-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { LANGUAGES } from '@/utils';


export default {
  name: 'LanguagesList',
  data() {
    return {
      val: 0,
      selectedLanguage: '',
      allLanguages: [],
    };
  },
  computed: {
    languages() {
      return [{ id: 0, title: 'All Languages', active: this.current === 0 }]
        .concat(this.allLanguages);
    },
    dropdownTitle() {
      return this.languages.reduce((current, language) => (
        this.val > 0 && language.id === this.val
          ? language.title
          : current), this.languages[0].title);
    },
  },
  watch: {
    selectedLanguage(value) {
      this.$emit('input', value);
    },
  },
  mounted() {
    this.allLanguages = Object.keys(LANGUAGES)
      .map((lang, index) => ({ id: index + 1, title: LANGUAGES[lang], value: lang }));
  },
  methods: {
    select(id, language) {
      this.val = id;
      this.selectedLanguage = language;
    },
  },
};
</script>
