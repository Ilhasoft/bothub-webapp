<template>
  <div class="languages-list">
    <b-field class="languages-list__field">
      <b-autocomplete
        v-model="selectedLanguage"
        :keep-first="keepFirst"
        :open-on-focus="openOnFocus"
        :data="optionsLanguages"
        :placeholder="$t('webapp.home.all_languages')"
        @select="option => select(option)" />
    </b-field>
  </div>
</template>

<script>
import { LANGUAGES } from '@/utils';


export default {
  name: 'LanguagesList',
  props: {
    fullSize: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'All languages',
    },
    openPosition: {
      type: String,
      default: null,
    },
    customLanguages: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      val: 0,
      selectedLanguage: '',
      keepFirst: true,
      openOnFocus: true,
      selected: null,
    };
  },
  computed: {
    languages() {
      if (this.customLanguages) {
        return [].concat(this.customLanguages);
      }
      return []
        .concat(Object.keys(LANGUAGES)
          .map((lang, index) => ({ id: index + 1, title: LANGUAGES[lang], value: lang })));
    },
    filterLanguages() {
      return this.languages.filter(option => option.title
        .toString()
        .toLowerCase()
        .indexOf(this.selectedLanguage.toLowerCase()) >= 0);
    },
    optionsLanguages() {
      return this.filterLanguages.map(option => option.title);
    },
  },
  watch: {
    selected(value) {
      this.$emit('input', value);
    },
    selectedLanguage() {
      if (this.selectedLanguage === '') {
        this.val = 0;
        this.selected = null;
      }
    },
  },
  methods: {
    select(option) {
      this.languages.filter((language) => {
        if (language.title === option) {
          this.selected = language.value;
          this.val = language.id;
        }
        return '';
      });
    },
  },
};
</script>

<style lang="scss">
.languages-list{
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &__field{
    width: 12.5rem;
  }
}

</style>
